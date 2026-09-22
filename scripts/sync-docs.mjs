import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const source = process.env.SURGE_DOCS_SOURCE ?? '.surge-source/docs';
const destination = 'src/content/docs/docs';

if (existsSync(source)) {
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  await cp(source, destination, { recursive: true });

  // Starlight uses index.md as the section landing page. Surge keeps that page as README.md.
  const readme = join(destination, 'README.md');
  if (existsSync(readme)) {
    await writeFile(join(destination, 'index.md'), await readFile(readme));
    await rm(readme);
  }
} else {
  console.log('Using the checked-in Surge documentation snapshot.');
}

async function normalizeStarlightPages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      await normalizeStarlightPages(file);
      continue;
    }
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;

    const content = await readFile(file, 'utf8');
    const frontmatter = content.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n*)/);
    const body = content.slice(frontmatter?.[0].length ?? 0);
    const heading = body.match(/^\s*#\s+(.+?)\s*\r?\n/)?.[1]?.trim();
    const title = frontmatter?.[0].match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))\s*$/m)?.slice(1).find(Boolean);
    const pageTitle = title ?? heading ?? entry.name.replace(/\.mdx?$/, '');
    const normalizedBody = heading === pageTitle
      ? body.replace(/^\s*#\s+.+?\s*\r?\n+/, '')
      : body;
    const normalized = `---\ntitle: ${JSON.stringify(pageTitle)}\n---\n\n${normalizedBody.replace(/^(?:\r?\n)+/, '')}`;

    if (normalized !== content) await writeFile(file, normalized);
  }
}

await normalizeStarlightPages(destination);
console.log(existsSync(source)
  ? `Synced Surge documentation from ${relative(process.cwd(), source) || '.'}.`
  : 'Normalized the checked-in Surge documentation snapshot.');
