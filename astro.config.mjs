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
          label: 'Overview',
          items: [
            { label: 'Introduction', slug: 'docs' },
            { label: 'Get started', slug: 'docs/getting-started' },
            { label: 'Choose a mode', slug: 'docs/concepts/modes' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Download and manage files', slug: 'docs/guides/download-files' },
            { label: 'Use the Surge TUI', slug: 'docs/guides/use-the-tui' },
            { label: 'Connect to a remote server', slug: 'docs/guides/connect-to-a-remote-server' },
            { label: 'Run as a system service', slug: 'docs/guides/run-as-a-service' },
            { label: 'Customize Surge', slug: 'docs/guides/customize-surge' },
          ],
        },
        {
          label: 'Configuration',
          items: [
            { label: 'Settings and configuration', slug: 'docs/settings' },
            { label: 'Custom themes', slug: 'docs/themes' },
            { label: 'Fonts', slug: 'docs/fonts' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Command-line reference', slug: 'docs/reference/cli' },
            {
              label: 'Commands',
              items: [
                { label: 'surge add', slug: 'docs/reference/commands/add' },
                { label: 'surge config', slug: 'docs/reference/commands/config' },
                { label: 'surge connect', slug: 'docs/reference/commands/connect' },
                { label: 'Inspect and manage downloads', slug: 'docs/reference/commands/inspect-and-manage' },
                { label: 'surge server', slug: 'docs/reference/commands/server' },
                { label: 'surge service', slug: 'docs/reference/commands/service' },
                { label: 'Utilities', slug: 'docs/reference/commands/utilities' },
              ],
            },
            { label: 'How Surge optimizes downloads', slug: 'docs/optimizations' },
            { label: 'Troubleshooting', slug: 'docs/help/troubleshooting' },
            { label: 'Legacy usage guide', slug: 'docs/usage' },
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
