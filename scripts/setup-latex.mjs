#!/usr/bin/env node
/**
 * One-time TinyTeX setup for local resume PDF builds.
 * Run: node scripts/setup-latex.mjs
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TINYTEX_BIN = path.join(
  process.env.HOME || '',
  'Library',
  'TinyTeX',
  'bin',
  'universal-darwin',
);
const INSTALLER_URL = 'https://yihui.org/tinytex/install-bin-unix.sh';

const PACKAGES = [
  'preprint',
  'fontawesome5',
  'mdframed',
  'enumitem',
  'titlesec',
  'fancyhdr',
  'marvosym',
  'xcolor',
  'hyperref',
  'lmodern',
  'latexmk',
  'multirow',
  'zref',
  'needspace',
  'babel-english',
  'hyphen-english',
  'tools',
  'latexmk',
];

function run(cmd, env = process.env) {
  execSync(cmd, { stdio: 'inherit', env });
}

if (!fs.existsSync(path.join(TINYTEX_BIN, 'pdflatex'))) {
  console.log('Installing TinyTeX to ~/Library/TinyTeX ...');
  run(`curl -sL '${INSTALLER_URL}' | sh`);
  console.log('\nAdd to ~/.zshrc if needed:');
  console.log(`  export PATH="$PATH:${TINYTEX_BIN}"`);
}

const env = {
  ...process.env,
  PATH: `${TINYTEX_BIN}${path.delimiter}${process.env.PATH || ''}`,
};

console.log('Installing LaTeX packages for resume...');
run(`tlmgr install ${PACKAGES.join(' ')}`, env);
console.log('\nReady. Run: npm run profile:sync');
