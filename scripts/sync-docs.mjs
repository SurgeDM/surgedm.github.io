import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const source = process.env.SURGE_DOCS_SOURCE ?? '.surge-source/docs';
const destination = 'src/content/docs/docs';

if (!existsSync(source)) {
  console.log('Using the checked-in Surge documentation snapshot.');
  process.exit(0);
}

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });

// Starlight uses index.md as the section landing page. Surge keeps that page as README.md.
const readme = join(destination, 'README.md');
if (existsSync(readme)) {
  await writeFile(join(destination, 'index.md'), await readFile(readme));
  await rm(readme);
}

async function addStarlightFrontmatter(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      await addStarlightFrontmatter(file);
      continue;
    }
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;

    const content = await readFile(file, 'utf8');
    if (content.startsWith('---\n')) continue;
    const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? entry.name.replace(/\.mdx?$/, '');
    await writeFile(file, `---\ntitle: ${JSON.stringify(heading)}\n---\n\n${content}`);
  }
}

await addStarlightFrontmatter(destination);
console.log(`Synced Surge documentation from ${relative(process.cwd(), source) || '.'}.`);
