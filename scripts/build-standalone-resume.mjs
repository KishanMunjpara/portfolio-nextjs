#!/usr/bin/env node
/**
 * Build a standalone resume PDF from a profile JSON without touching portfolio files.
 *
 * Usage:
 *   node scripts/build-standalone-resume.mjs <profile.json> <output.pdf>
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const STANDALONE_TEMPLATE = path.join(ROOT, 'resume', 'standalone-main.tex');
const TINYTEX_BIN = path.join(
  process.env.HOME || '',
  'Library',
  'TinyTeX',
  'bin',
  'universal-darwin',
);

function escapeLatex(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/"/g, "''")
    .replace(/Q&A/g, 'Q\\&A');
}

function section(title) {
  return `\\resumeSectionBox{${escapeLatex(title)}}`;
}

function generateHeader(profile) {
  const { contact } = profile;
  const role = profile.role || 'Financial Advisor';
  return `\\begin{center}
    {\\Huge \\textsc{${escapeLatex(contact.name)}}} \\\\ \\vspace{2pt}
    {\\small ${escapeLatex(role)}} \\\\ \\vspace{4pt}
    \\small
    \\raisebox{-0.1\\height}{\\faPhone\\ \\href{tel:${contact.phoneTel}}{${escapeLatex(contact.phone)}}} ~
    \\href{mailto:${contact.email}}{\\faEnvelope\\ ${escapeLatex(contact.email)}} ~
    ${escapeLatex(contact.location)}
    \\vspace{-4pt}
\\end{center}
\\vspace{4pt}
`;
}

function generateSummary(profile) {
  if (!profile.summary) return '';
  const title = profile.summaryTitle || 'Career Objective';
  return `${section(title)}
\\small ${escapeLatex(profile.summary)}
\\vspace{6pt}
`;
}

function generateEducation(profile) {
  const rows = profile.education
    .filter((e) => e.showOnResume)
    .map((e) => {
      let block = `    \\textbf{${escapeLatex(e.degree)}} & \\textbf{${escapeLatex(e.resumeDateRange)}} \\\\\n`;
      block += `    ${escapeLatex(e.institution)} \\\\\n`;
      if (e.coursework) {
        block += `  \\emph{\\textbf{Coursework}: ${escapeLatex(e.coursework)}} \\\\\n`;
      }
      return block;
    })
    .join('\n');

  return `${section('Education')}
\\begin{tabular}{@{}p{0.75\\linewidth}r}
${rows}\\end{tabular}
\\vspace{6pt}
`;
}

function generateSkills(profile) {
  const items = profile.skills.categories
    .map((c) => `  \\small\\item \\textbf{${escapeLatex(c.label)}}: ${escapeLatex(c.items)}`)
    .join('\n');

  return `${section('Technical Skills')}
\\begin{itemize}[leftmargin=0.15in, label={}, nosep, topsep=2pt, itemsep=3pt]
${items}
\\end{itemize}
\\vspace{6pt}
`;
}

function generateExperience(profile) {
  const entries = profile.work
    .filter((w) => w.showOnResume)
    .map((w) => {
      const bullets = w.bullets
        .map((b) => `        \\resumeItem{${escapeLatex(b)}}`)
        .join('\n');
      let block = `
  \\resumeSubheading
      {${escapeLatex(w.companyResume)}}{${escapeLatex(w.resumeDateRange)}}
      {${escapeLatex(w.title)}}{${escapeLatex(w.locationResume || w.location)}}
      \\resumeItemListStart
${bullets}
      \\resumeItemListEnd`;
      if (w.learning) {
        block += `\n    \\vspace{2pt}\\hspace{15pt}\\small\\textbf{Learning:} ${escapeLatex(w.learning)}`;
      }
      return block;
    })
    .join('\n');

  return `${section('Professional Experience')}
\\resumeSubHeadingListStart
${entries}
\\resumeSubHeadingListEnd
`;
}

function generateProjects(profile) {
  const entries = profile.projects
    .filter((p) => p.showOnResume && p.bullets?.length)
    .map((p) => {
      const subtitle = p.subtitle ? ` $|$ \\emph{${escapeLatex(p.subtitle)}}` : '';
      const bullets = p.bullets
        .map((b) => `            \\resumeItem{${escapeLatex(b)}}`)
        .join('\n');
      return `        \\resumeProjectHeading
          {\\textbf{${escapeLatex(p.title)}}${subtitle}}{${escapeLatex(p.dateRange)}}
          \\resumeItemListStart
${bullets}
          \\resumeItemListEnd`;
    })
    .join('\n\n');

  return `${section('Projects')}
\\resumeSubHeadingListStart
${entries}
\\resumeSubHeadingListEnd
`;
}

function generateAwards(profile) {
  if (!profile.resumeAwards?.length) return '';
  const title = profile.awardsSectionTitle || 'Awards and Certifications';

  // Compact single-line layout keeps licences visible without pushing content to page 2.
  if (profile.awardsInline) {
    const items = profile.resumeAwards
      .map((a) => `\\textbf{${escapeLatex(a.issuer)}}`)
      .join(' \\quad$\\cdot$\\quad ');
    return `${section(title)}
\\noindent\\small ${items}
\\vspace{4pt}
`;
  }

  const items = profile.resumeAwards
    .map((a) => {
      if (a.title) {
        return `    \\resumeItem{\\textbf{${escapeLatex(a.issuer)}}: ${escapeLatex(a.title)}}`;
      }
      return `    \\resumeItem{\\textbf{${escapeLatex(a.issuer)}}}`;
    })
    .join('\n');

  return `${section(title)}
\\resumeItemListStart
${items}
\\resumeItemListEnd
`;
}

function generateInterests(profile) {
  if (!profile.interests?.length) return '';
  const items = profile.interests
    .map((interest) => {
      if (interest.description) {
        return `    \\resumeItem{\\textbf{${escapeLatex(interest.title)}}: ${escapeLatex(interest.description)}}`;
      }
      return `    \\resumeItem{${escapeLatex(interest.title)}}`;
    })
    .join('\n');

  return `${section('Interests')}
\\resumeItemListStart
${items}
\\resumeItemListEnd
`;
}

function buildMainTex(profile) {
  // Default: summary → skills → experience → education → certs (strong for job applications).
  // Set profile.awardsEarly = true to place certifications before experience (e.g. licence-heavy roles).
  const awards = profile.resumeAwards?.length ? '\\input{Awards}' : '';
  const sections = [
    '\\input{Header}',
    profile.summary ? '\\input{Summary}' : '',
    '\\input{Skills}',
    ...(profile.awardsEarly && awards ? [awards] : []),
    profile.work.some((w) => w.showOnResume) ? '\\input{Experience}' : '',
    '\\input{Education}',
    ...(!profile.awardsEarly && awards ? [awards] : []),
    profile.projects.some((p) => p.showOnResume && p.bullets?.length) ? '\\input{Projects}' : '',
    profile.interests?.length ? '\\input{Interests}' : '',
    '\\end{document}',
  ].filter(Boolean);

  const preamble = fs.readFileSync(STANDALONE_TEMPLATE, 'utf8');
  return `${preamble}\n${sections.join('\n\n')}\n`;
}

function resolvePdfLatex() {
  const fromTinyTex = path.join(TINYTEX_BIN, 'pdflatex');
  if (fs.existsSync(fromTinyTex)) return fromTinyTex;
  return 'pdflatex';
}

function compilePdf(buildDir) {
  const pdflatex = resolvePdfLatex();
  const env = {
    ...process.env,
    PATH: `${TINYTEX_BIN}${path.delimiter}${process.env.PATH || ''}`,
  };

  for (let pass = 1; pass <= 2; pass += 1) {
    try {
      execSync(`"${pdflatex}" -interaction=nonstopmode main.tex`, {
        cwd: buildDir,
        env,
        stdio: 'pipe',
      });
    } catch (error) {
      const output = error.stdout?.toString() || error.stderr?.toString() || '';
      if (!output.includes('Output written on main.pdf')) {
        console.error(output.slice(-4000));
        throw new Error(`pdflatex pass ${pass} failed`);
      }
    }
  }
}

function main() {
  const profilePath = path.resolve(process.argv[2]);
  const outputPdf = path.resolve(process.argv[3]);
  if (!profilePath || !outputPdf) {
    console.error('Usage: node scripts/build-standalone-resume.mjs <profile.json> <output.pdf>');
    process.exit(1);
  }

  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  const buildDir = path.join(path.dirname(profilePath), 'build');
  fs.mkdirSync(buildDir, { recursive: true });

  fs.writeFileSync(path.join(buildDir, 'main.tex'), buildMainTex(profile));
  fs.writeFileSync(path.join(buildDir, 'Header.tex'), generateHeader(profile));
  if (profile.summary) {
    fs.writeFileSync(path.join(buildDir, 'Summary.tex'), generateSummary(profile));
  }
  fs.writeFileSync(path.join(buildDir, 'Education.tex'), generateEducation(profile));
  fs.writeFileSync(path.join(buildDir, 'Skills.tex'), generateSkills(profile));
  if (profile.work.some((w) => w.showOnResume)) {
    fs.writeFileSync(path.join(buildDir, 'Experience.tex'), generateExperience(profile));
  }
  if (profile.projects.some((p) => p.showOnResume && p.bullets?.length)) {
    fs.writeFileSync(path.join(buildDir, 'Projects.tex'), generateProjects(profile));
  }
  if (profile.resumeAwards?.length) {
    fs.writeFileSync(path.join(buildDir, 'Awards.tex'), generateAwards(profile));
  }
  if (profile.interests?.length) {
    fs.writeFileSync(path.join(buildDir, 'Interests.tex'), generateInterests(profile));
  }

  console.log('Compiling resume PDF...');
  compilePdf(buildDir);

  const builtPdf = path.join(buildDir, 'main.pdf');
  if (!fs.existsSync(builtPdf)) {
    throw new Error('main.pdf was not created');
  }

  fs.mkdirSync(path.dirname(outputPdf), { recursive: true });
  fs.copyFileSync(builtPdf, outputPdf);
  console.log(`Resume created: ${outputPdf}`);
}

main();
