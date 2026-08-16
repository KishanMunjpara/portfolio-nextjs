#!/usr/bin/env node
/**
 * Single source of truth: profile/profile.json
 * Generates portfolio src/data/*.ts and resume/*.tex
 *
 * Usage: npm run profile:sync
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PROFILE_PATH = path.join(ROOT, 'profile', 'profile.json');
const RESUME_DIR = path.join(ROOT, 'resume');
const RESUME_PDF_OUTPUT = path.join(ROOT, 'public', 'assets', 'pdfs', 'kishan_resume.pdf');
const TINYTEX_BIN = path.join(
  process.env.HOME || '',
  'Library',
  'TinyTeX',
  'bin',
  'universal-darwin',
);

const GENERATED_BANNER_TS = `// AUTO-GENERATED — do not edit by hand.
// Edit profile/profile.json, then run: npm run profile:sync
`;

const GENERATED_BANNER_TEX = `% AUTO-GENERATED — do not edit by hand.
% Edit profile/profile.json, then run: npm run profile:sync
`;

function readProfile() {
  return JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
}

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

function tsString(value) {
  return JSON.stringify(value);
}

function writeFile(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log(`  wrote ${relPath}`);
}

function generatePersonal(profile) {
  const { contact, positioning, about } = profile;
  return `${GENERATED_BANNER_TS}import { PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: ${tsString(contact.name)},
  title: ${tsString(positioning.title)},
  subtitle: ${tsString(positioning.subtitle)},
  availability: ${tsString(positioning.availability)},
  description: ${tsString(positioning.description)},
  email: ${tsString(contact.email)},
  phone: ${tsString(contact.phone)},
  location: ${tsString(contact.location)},
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: ${tsString(contact.linkedin)},
      icon: 'linkedin',
    },
    {
      platform: 'GitHub',
      url: ${tsString(contact.github)},
      icon: 'github',
    },
  ],
  profileImage: ${tsString(positioning.profileImage)},
  resumePdfUrl: ${tsString(positioning.resumePdfUrl)},
};

export const aboutInfo = {
  yearsExperience: ${tsString(about.yearsExperience)},
  completedProjects: ${tsString(about.completedProjects)},
  companiesWorked: ${tsString(about.companiesWorked)},
  description: ${tsString(about.description)},
  image: ${tsString(positioning.profileImage)},
};
`;
}

function generateExperience(profile) {
  const work = profile.work.filter((w) => w.showOnPortfolio);
  const edu = profile.education.filter((e) => e.showOnPortfolio);

  const workBlocks = work.map(
    (w) => `  {
    id: ${tsString(w.id)},
    title: ${tsString(w.titlePortfolio || w.title)},
    company: ${tsString(w.companyPortfolio || w.companyResume)},
    location: ${tsString(w.location)},
    startDate: ${tsString(w.startDate)},
    endDate: ${w.endDate === null ? 'null' : tsString(w.endDate)},
    description: ${tsString(w.portfolioDescription)},
    type: 'work' as const,
  }`,
  );

  const eduBlocks = edu.map(
    (e) => `  {
    id: ${tsString(e.id)},
    title: ${tsString(e.degree)},
    company: ${tsString(e.institutionPortfolio || e.institution)},
    location: ${tsString(e.location)},
    startDate: ${tsString(e.startDate)},
    endDate: ${e.endDate === null ? 'null' : tsString(e.endDate)},
    description: ${tsString(e.portfolioDescription)},
    type: 'education' as const,
  }`,
  );

  return `${GENERATED_BANNER_TS}import { Experience } from '@/types';

export const workExperience: Experience[] = [
${workBlocks.join(',\n')}
];

export const education: Experience[] = [
${eduBlocks.join(',\n')}
];
`;
}

function projectImpact(p) {
  if (p.portfolioImpact) return p.portfolioImpact;
  if (p.bullets?.length) return p.bullets[0];
  const metric = p.description?.match(/[^.!?]*(?:\d+%|\d+\+|#\d+)[^.!?]*[.!?]/);
  if (metric) return metric[0].trim();
  const first = p.description?.match(/^[^.!?]+[.!?]/);
  return first ? first[0].trim() : '';
}

function generateProjects(profile) {
  const projects = profile.projects.filter((p) => p.showOnPortfolio);
  const blocks = projects.map((p) => {
    const impact = projectImpact(p);
    const impactLine = impact ? `\n    impact: ${tsString(impact)},` : '';
    return `  {
    id: ${tsString(p.id)},
    title: ${tsString(p.title)},
    description: ${tsString(p.description)},${impactLine}
    image: ${tsString(p.image)},
    technologies: ${JSON.stringify(p.technologies)},
    links: ${JSON.stringify(p.links, null, 6).replace(/\n/g, '\n    ')},
    featured: ${p.featured},
  }`;
  });

  return `${GENERATED_BANNER_TS}import { Project } from '@/types';

export const projects: Project[] = [
${blocks.join(',\n')}
];
`;
}

function generateResearch(profile) {
  const pubs = profile.publications.map(
    (p) => `  {
    id: ${tsString(p.id)},
    title: ${tsString(p.titlePortfolio || p.title)},
    journal: ${tsString(p.journalPortfolio || p.venue)},
    authors: ${JSON.stringify(p.authorsPortfolio)},
    link: ${tsString(p.link)},
    description: ${tsString(p.portfolioDescription)},
    year: ${tsString(p.year)},
  }`,
  );

  const patents = profile.patents.map(
    (p) => `  {
    id: ${tsString(p.id)},
    title: ${tsString(p.titlePortfolio || p.title)},
    authors: ${JSON.stringify(p.authorsPortfolio)},
    link: ${tsString(p.linkPortfolio || p.link)},
    description: ${tsString(p.portfolioDescription)},
    year: ${tsString(p.year)},
  }`,
  );

  return `${GENERATED_BANNER_TS}import { Publication, Patent } from '@/types';

export const publications: Publication[] = [
${pubs.join(',\n')}
];

export const patents: Patent[] = [
${patents.join(',\n')}
];
`;
}

function generateCertifications(profile) {
  const blocks = profile.certifications.map(
    (c) => `  {
    id: ${tsString(c.id)},
    title: ${tsString(c.title)},
    issuer: ${tsString(c.issuer)},
    image: ${tsString(c.image)},
    certificateUrl: ${tsString(c.certificateUrl)},
    issueDate: ${tsString(c.issueDate)},
    description: ${tsString(c.description)},
  }`,
  );

  return `${GENERATED_BANNER_TS}import { Certification } from '@/types';

export const certifications: Certification[] = [
${blocks.join(',\n')}
];
`;
}

function generateResumeHeader(profile) {
  const { contact } = profile;
  const linkedinHandle = contact.linkedin.replace(/\/$/, '').split('/').pop();
  const githubHandle = contact.github.replace(/\/$/, '').split('/').pop();

  return `${GENERATED_BANNER_TEX}
\\begin{center}
    {\\Huge \\textsc{${escapeLatex(contact.name)}}} \\\\ \\vspace{1pt}
    \\small
    \\raisebox{-0.1\\height}{\\faPhone\\ \\href{tel:${contact.phoneTel}}{${escapeLatex(contact.phone)}}} ~
    \\href{mailto:${contact.email}}{\\faEnvelope\\ ${escapeLatex(contact.email)}} ~
    \\href{${contact.linkedin}}{\\faLinkedin\\ ${escapeLatex(linkedinHandle)}} ~
    \\href{${contact.github}}{\\faGithub\\ ${escapeLatex(githubHandle)}} ~
    \\href{${contact.portfolio}}{\\faDesktop\\ Portfolio}
    \\vspace{-8pt}
\\end{center}
`;
}

function generateResumeEducation(profile) {
  const rows = profile.education
    .filter((e) => e.showOnResume)
    .map((e) => {
      let block = `    \\textbf{${escapeLatex(e.degree)}} & \\textbf{${escapeLatex(e.resumeDateRange)}} \\\\\n`;
      if (e.gpa) {
        block += `    ${escapeLatex(e.institution)} & CGPA: ${escapeLatex(e.gpa)} \\\\\n`;
      } else {
        block += `    ${escapeLatex(e.institution)} \\\\\n`;
      }
      if (e.coursework) {
        block += `  \\emph{\\textbf{Coursework}: ${escapeLatex(e.coursework)}} \\\\\n`;
      }
      return block;
    })
    .join('\n');

  return `${GENERATED_BANNER_TEX}
\\section*{\\fcolorbox{black}{lightgray}{\\parbox{\\textwidth}{Education}}}

\\begin{tabular}{@{}p{0.75\\linewidth}r}
${rows}\\end{tabular}
\\vspace{-5pt}
`;
}

function generateResumeSkills(profile) {
  const categories = profile.skills.categories;
  const lines = categories
    .map((c, index) => {
      const lineBreak = index < categories.length - 1 ? ' \\\\' : '';
      return `     \\textbf{${escapeLatex(c.label)}}{: ${escapeLatex(c.items)}${lineBreak}`;
    })
    .join('\n');

  return `${GENERATED_BANNER_TEX}
\\section*{\\fcolorbox{black}{lightgray}{\\parbox{\\textwidth}{Technical Skills}}}
 \\begin{itemize}[leftmargin=0.1in, label={}]
 \\vspace{-5pt}
    \\small{\\item{
${lines} }}
 \\end{itemize}
\\vspace{-16pt}
`;
}

function resumeSettings(profile) {
  return {
    maxBulletsPerRole: profile.resume?.maxBulletsPerRole ?? 4,
    maxPublicationBullets: profile.resume?.maxPublicationBullets ?? null,
    includeLearningLines: profile.resume?.includeLearningLines ?? true,
    includeAwardsSection: profile.resume?.includeAwardsSection ?? true,
    maxProjects: profile.resume?.maxProjects ?? null,
  };
}

function generateResumeExperience(profile) {
  const settings = resumeSettings(profile);
  const entries = profile.work
    .filter((w) => w.showOnResume)
    .map((w) => {
      const bullets = w.bullets
        .slice(0, settings.maxBulletsPerRole)
        .map((b) => `        \\resumeItem {${escapeLatex(b)}}`)
        .join('\n');
      let block = `
  \\resumeSubheading
      {${escapeLatex(w.companyResume)}}{${escapeLatex(w.resumeDateRange)}}
      {${escapeLatex(w.title)}}{${escapeLatex(w.locationResume || w.location)}}
      \\resumeItemListStart
${bullets}
    \\resumeItemListEnd`;
      if (settings.includeLearningLines && w.learning) {
        block += `\n    \\hspace{15pt}\\textbf{Learning:} ${escapeLatex(w.learning)}`;
      }
      return block;
    })
    .join('\n');

  return `${GENERATED_BANNER_TEX}
\\section*{\\fcolorbox{black}{lightgray}{\\parbox{\\textwidth}{Professional Experience}}}
  \\resumeSubHeadingListStart
${entries}
  \\resumeSubHeadingListEnd
\\vspace{-20pt}
`;
}

function generateResumeProjects(profile) {
  const settings = resumeSettings(profile);
  let projects = profile.projects.filter((p) => p.showOnResume && p.bullets?.length);
  if (settings.maxProjects != null) {
    projects = projects.slice(0, settings.maxProjects);
  }
  const entries = projects
    .map((p) => {
      const subtitle = p.subtitle ? ` $|$ \\emph{${escapeLatex(p.subtitle)}  \\href{}{}}` : '';
      const bullets = p.bullets
        .map((b) => `            \\resumeItem{${escapeLatex(b)}}`)
        .join('\n');
      return `        \\resumeProjectHeading
          {\\textbf{${escapeLatex(p.title)}}${subtitle}}{${escapeLatex(p.dateRange)}}
          \\resumeItemListStart
${bullets}
          \\resumeItemListEnd
          \\vspace{-20pt}`;
    })
    .join('\n          \n');

  return `${GENERATED_BANNER_TEX}
\\section*{\\fcolorbox{black}{lightgray}{\\parbox{\\textwidth}{Projects}}}
\\vspace{-14pt}
\\resumeSubHeadingListStart
${entries}
\\resumeSubHeadingListEnd
\\vspace{2pt}
`;
}

function generateResumePublications(profile) {
  const settings = resumeSettings(profile);
  const bulletLimit = settings.maxPublicationBullets;

  const pubBlocks = profile.publications.map((p) => {
    const bullets = p.bullets
      .slice(0, bulletLimit ?? p.bullets.length)
      .map((b) => `    \\item ${escapeLatex(b)}`)
      .join('\n');
    return `\\resumeProjectHeading
{\\textbf{${escapeLatex(p.title)}} $|$ \\href[pdfnewwindow=true]{${p.link}}{${escapeLatex(p.venue)}} }{\\textbf{${escapeLatex(p.date)}}}
\\vspace{-13.5pt}
\\begin{itemize}[label=\\textcolor{black}{\\tiny$\\bullet$}, left=5pt]
${bullets}
\\end{itemize}`;
  });

  const patentBlocks = profile.patents.map((p) => {
    const bullets = p.bullets
      .slice(0, bulletLimit ?? p.bullets.length)
      .map((b) => `    \\item ${escapeLatex(b)}`)
      .join('\n');
    return `{\\textbf{${escapeLatex(p.title)}}$|$ 
 \\href[pdfnewwindow=true]{${p.link}}{PATENT}} \\hspace{20.5pt}\\textbf{${escapeLatex(p.date)}}
 \\vspace{-5pt}
\\begin{itemize}[label=\\textcolor{black}{\\tiny$\\bullet$}, left=5pt]
${bullets}
\\end{itemize}`;
  });

  return `${GENERATED_BANNER_TEX}
\\section*{\\fcolorbox{black}{lightgray}{\\parbox{\\textwidth}{ Publication}}}
\\vspace{-21pt}
\\resumeSubHeadingListStart
${pubBlocks.join('\n\n')}
${patentBlocks.join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-20pt}
`;
}

function generateResumeAwards(profile) {
  if (!resumeSettings(profile).includeAwardsSection || !profile.resumeAwards?.length) {
    return `${GENERATED_BANNER_TEX}
% Awards omitted — see certifications on portfolio site.
`;
  }
  const items = profile.resumeAwards
    .map((a) => `    \\resumeItem{\\textbf{${escapeLatex(a.issuer)}}: ${escapeLatex(a.title)}}`)
    .join('\n');

  return `${GENERATED_BANNER_TEX}
\\section*{\\fcolorbox{black}{lightgray}{\\parbox{\\textwidth}{Awards and Certifications}}}
\\vspace{-8pt}
\\resumeItemListStart
${items}
\\resumeItemListEnd
\\vspace{-20pt}
`;
}

function patchMainTex(profile) {
  const mainPath = path.join(RESUME_DIR, 'main.tex');
  let main = fs.readFileSync(mainPath, 'utf8');
  const settings = resumeSettings(profile);

  if (!main.includes('\\input{Header}')) {
    main = main.replace(
      /\\begin\{center\}[\s\S]*?\\end\{center\}/,
      '\\input{Header}',
    );
  }

  if (!main.includes('\\input{Awards}')) {
    main = main.replace(
      /%-----------PROGRAMMING SKILLS-----------\n\\section\*\{\\fcolorbox\{black\}\{lightgray\}\{\\parbox\{\\textwidth\}\{Awards and Certifications\}\}\}[\s\S]*?\\resumeItemListEnd\n\\vspace\{-20pt\}/,
      '%-----------AWARDS-----------\n\\input{Awards}',
    );
  }

  if (settings.includeAwardsSection) {
    if (!main.includes('\\input{Awards}')) {
      main += '\n\\input{Awards}\n';
    }
  } else {
    main = main.replace(/\n\\input\{Awards\}\n?/g, '\n% \\input{Awards}\n');
  }

  fs.writeFileSync(mainPath, main, 'utf8');
  console.log('  patched resume/main.tex');
}

function resolvePdfLatex() {
  const fromTinyTex = path.join(TINYTEX_BIN, 'pdflatex');
  if (fs.existsSync(fromTinyTex)) {
    return fromTinyTex;
  }
  return 'pdflatex';
}

function compileResumePdf() {
  const pdflatex = resolvePdfLatex();
  const env = {
    ...process.env,
    PATH: `${TINYTEX_BIN}${path.delimiter}${process.env.PATH || ''}`,
  };

  console.log('\nCompiling resume PDF (same LaTeX design)...');
  for (let pass = 1; pass <= 2; pass += 1) {
    try {
      execSync(`"${pdflatex}" -interaction=nonstopmode main.tex`, {
        cwd: RESUME_DIR,
        env,
        stdio: 'pipe',
      });
    } catch (error) {
      const output = error.stdout?.toString() || error.stderr?.toString() || '';
      if (!output.includes('Output written on main.pdf')) {
        console.error(output.slice(-4000));
        throw new Error(`pdflatex pass ${pass} failed`);
      }
      console.warn(`  pdflatex pass ${pass} had warnings (PDF may still be OK)`);
    }
  }

  const builtPdf = path.join(RESUME_DIR, 'main.pdf');
  if (!fs.existsSync(builtPdf)) {
    throw new Error('main.pdf was not created — install TinyTeX or run: brew install --cask basictex');
  }

  fs.mkdirSync(path.dirname(RESUME_PDF_OUTPUT), { recursive: true });
  fs.copyFileSync(builtPdf, RESUME_PDF_OUTPUT);
  console.log(`  copied → public/assets/pdfs/kishan_resume.pdf`);
}

function createOverleafZip() {
  const files = [
    'main.tex',
    'Header.tex',
    'Education.tex',
    'Skills.tex',
    'Experience.tex',
    'Projects.tex',
    'Publication.tex',
    'Awards.tex',
  ];
  const zipName = 'Kishan_Munjpara_Resume_RPL_DBMS.zip';
  const zipPath = path.join(ROOT, zipName);
  const cwd = RESUME_DIR;
  const existing = files.filter((f) => fs.existsSync(path.join(cwd, f)));
  try {
    execSync(`zip -j -q "${zipPath}" ${existing.map((f) => f).join(' ')}`, { cwd });
    console.log(`  created ${zipName}`);
  } catch {
    console.warn('  zip command failed — upload resume/*.tex to Overleaf manually');
  }
}

async function main() {
  const compileResume = process.argv.includes('--resume');
  console.log('Syncing profile → portfolio' + (compileResume ? ' + resume PDF' : '') + '\n');
  const profile = readProfile();

  writeFile('src/data/personal.ts', generatePersonal(profile));
  writeFile('src/data/experience.ts', generateExperience(profile));
  writeFile('src/data/projects.ts', generateProjects(profile));
  writeFile('src/data/research.ts', generateResearch(profile));
  writeFile('src/data/certifications.ts', generateCertifications(profile));

  writeFile('resume/Header.tex', generateResumeHeader(profile));
  writeFile('resume/Education.tex', generateResumeEducation(profile));
  writeFile('resume/Skills.tex', generateResumeSkills(profile));
  writeFile('resume/Experience.tex', generateResumeExperience(profile));
  writeFile('resume/Projects.tex', generateResumeProjects(profile));
  writeFile('resume/Publication.tex', generateResumePublications(profile));
  writeFile('resume/Awards.tex', generateResumeAwards(profile));

  patchMainTex(profile);

  if (compileResume) {
    compileResumePdf();
    createOverleafZip();
  } else {
    console.log('\nSkipping resume PDF compile (use: npm run profile:resume)');
  }

  console.log('\nDone.');
  console.log('  • Portfolio content updated');
  if (compileResume) {
    console.log('  • Resume PDF updated at public/assets/pdfs/kishan_resume.pdf');
  }
  console.log('  Edit profile/profile.json, then run: npm run profile:sync');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
