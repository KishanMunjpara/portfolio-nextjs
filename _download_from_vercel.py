#!/usr/bin/env python3
"""Download deployment source from Vercel API."""
import base64
import json
import os
import sys
import urllib.request

DEPLOYMENT_ID = "dpl_EHzVTaTaFReDK3MSJr3h3ZnKyiyk"
TEAM_ID = "team_JtYJymSIz53EJwiuAcgTrzpK"
OUT_DIR = os.path.dirname(os.path.abspath(__file__))
PREFIX_STRIP = "src/"  # deployment root directory

auth_path = os.path.expanduser(
    "~/Library/Application Support/com.vercel.cli/auth.json"
)
with open(auth_path) as f:
    TOKEN = json.load(f)["token"]


def api_get(url: str) -> bytes:
    req = urllib.request.Request(
        url, headers={"Authorization": f"Bearer {TOKEN}"}
    )
    with urllib.request.urlopen(req) as resp:
        return resp.read()


def list_files():
    url = (
        f"https://api.vercel.com/v6/deployments/{DEPLOYMENT_ID}/files"
        f"?teamId={TEAM_ID}"
    )
    return json.loads(api_get(url).decode())


def download_file(uid: str) -> bytes:
    url = (
        f"https://api.vercel.com/v8/deployments/{DEPLOYMENT_ID}/files/{uid}"
        f"?teamId={TEAM_ID}"
    )
    data = json.loads(api_get(url).decode())
    return base64.b64decode(data["data"])


def walk(nodes, path=""):
    for node in nodes:
        name = node["name"]
        rel = f"{path}/{name}" if path else name
        if node["type"] == "directory":
            yield from walk(node.get("children", []), rel)
        elif node["type"] == "file" and node.get("uid"):
            yield rel, node["uid"]


def main():
    tree = list_files()
    files = list(walk(tree))
    print(f"Downloading {len(files)} files to {OUT_DIR}")

    for i, (rel_path, uid) in enumerate(files, 1):
        if rel_path.startswith(PREFIX_STRIP):
            local_rel = rel_path[len(PREFIX_STRIP) :]
        else:
            local_rel = rel_path

        out_path = os.path.join(OUT_DIR, local_rel)
        os.makedirs(os.path.dirname(out_path) or OUT_DIR, exist_ok=True)

        try:
            content = download_file(uid)
            with open(out_path, "wb") as f:
                f.write(content)
            if i % 20 == 0 or i == len(files):
                print(f"  [{i}/{len(files)}] {local_rel}")
        except Exception as e:
            print(f"  FAILED {local_rel}: {e}", file=sys.stderr)

    print("Done.")


if __name__ == "__main__":
    main()
