import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://surgedm.github.io',
  integrations: [
    starlight({
      title: 'Surge Docs',
      description: 'Documentation for Surge, the blazing-fast terminal download manager.',
      disable404Route: true,
      social: [
        {
          icon: 'github',
          label: 'Surge on GitHub',
          href: 'https://github.com/surgedm/surge',
        },
      ],
      sidebar: [
        {
          label: 'Get started',
          items: [
            { label: 'Overview', slug: 'docs' },
            { label: 'Installation', slug: 'docs/getting-started' },
          ],
        },
        {
          label: 'Project',
          items: [
            { label: 'Source on GitHub', link: 'https://github.com/surgedm/surge' },
            { label: 'Report an issue', link: 'https://github.com/surgedm/surge/issues' },
          ],
        },
      ],
      customCss: ['./src/styles/starlight.css'],
    }),
  ],
});
