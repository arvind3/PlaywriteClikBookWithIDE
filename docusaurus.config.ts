import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const analyticsConfig = require('./analytics/analytics.config.json') as {
  book_id: string;
  ga4: {measurement_id: string};
  gtm: {container_id: string};
  consent: {mode: 'always_on' | 'balanced_by_region' | 'strict_by_default'};
  region_policy: {restricted_regions: string[]};
};

const config: Config = {
  title: 'Playwright CLI: The Agentic Testing Handbook',
  tagline: 'Master token-efficient browser automation for AI agents, QA engineers, and developers',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://arvind3.github.io',
  baseUrl: '/PlaywriteClikBookWithIDE/',

  organizationName: 'arvind3',
  projectName: 'PlaywriteClikBookWithIDE',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      require.resolve('./plugins/ga4-skill-plugin'),
      {
        measurementId: analyticsConfig.ga4.measurement_id,
        gtmContainerId: analyticsConfig.gtm.container_id,
        bookId: analyticsConfig.book_id,
        consentMode: analyticsConfig.consent.mode,
        restrictedRegions: analyticsConfig.region_policy.restricted_regions,
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/arvind3/PlaywriteClikBookWithIDE/tree/main/',
          routeBasePath: 'docs',
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/playwright-cli-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: 'Playwright CLI Book',
      logo: {
        alt: 'Playwright CLI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bookSidebar',
          position: 'left',
          label: 'Chapters',
        },
        {
          href: 'https://github.com/microsoft/playwright-cli',
          label: 'Playwright CLI',
          position: 'right',
        },
        {
          href: 'https://github.com/arvind3/PlaywriteClikBookWithIDE',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Book Chapters',
          items: [
            { label: 'Introduction', to: '/docs/chapter-01-agentic-testing-revolution' },
            { label: 'CLI vs MCP Architecture', to: '/docs/chapter-02-cli-vs-mcp-architecture' },
            { label: 'Installation & First Run', to: '/docs/chapter-03-installation-and-first-run' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Playwright CLI GitHub', href: 'https://github.com/microsoft/playwright-cli' },
            { label: 'Playwright Docs', href: 'https://playwright.dev' },
            { label: 'Playwright Agents', href: 'https://playwright.dev/docs/test-agents' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/arvind3/PlaywriteClikBookWithIDE' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Playwright CLI Book. Built with Docusaurus. This site uses privacy-aware analytics to improve book content quality.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'bash', 'yaml', 'json', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
