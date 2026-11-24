import { existsSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = fileURLToPath(new URL('../src/content/docs/docs', import.meta.url));

export default {
  name: 'surge-docs-links',
  element: {
    filter: ['a'],
    visit(node, context) {
      if (context.fileURL?.protocol !== 'file:') return;
      const filename = fileURLToPath(context.fileURL);
      if (!filename.startsWith(docsRoot + sep)) return;

      const href = node.properties?.href;
      if (typeof href !== 'string' || /^(?:[a-z][a-z\d+.-]*:|\/)/i.test(href)) return;
      const match = href.match(/^([^?#]+)(\.mdx?|\.json)([?#].*)?$/i);
      if (!match) return;

      const target = resolve(dirname(filename), match[1]);
      if (!target.startsWith(docsRoot + sep)) return;
      const segments = relative(docsRoot, target).split(sep);
      if (match[2] === '.json') {
        if (segments.slice(0, -1).join('/') === 'reference/schemas' && existsSync(target + '.json')) {
          context.setProperty(node, 'href', `/docs/${segments.join('/')}.json${match[3] ?? ''}`);
        }
        return;
      }

      const pageSegments = segments.map(segment => segment.toLowerCase());
      const isIndex = ['readme', 'index'].includes(pageSegments.at(-1));
      const destination = isIndex ? resolve(dirname(target), 'index') : target;
      if (!existsSync(destination + '.md') && !existsSync(destination + '.mdx')) return;

      if (isIndex) pageSegments.pop();
      const route = ['docs', ...pageSegments].join('/');
      context.setProperty(node, 'href', `/${route}/${match[3] ?? ''}`);
    },
  },
};
