import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  bookSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Part I: Foundations',
      collapsed: false,
      items: [
        'chapter-01-agentic-testing-revolution',
        'chapter-02-cli-vs-mcp-architecture',
        'chapter-03-installation-and-first-run',
      ],
    },
    {
      type: 'category',
      label: 'Part II: Core Mechanics',
      collapsed: false,
      items: [
        'chapter-04-core-cli-commands',
        'chapter-05-snapshot-state-management',
      ],
    },
    {
      type: 'category',
      label: 'Part III: Agentic Integration',
      collapsed: false,
      items: [
        'chapter-06-connecting-ai-agents',
        'chapter-07-playwright-agents-planner-generator-healer',
        'chapter-08-autonomous-website-discovery',
      ],
    },
    {
      type: 'category',
      label: 'Part IV: Advanced Capabilities',
      collapsed: false,
      items: [
        'chapter-09-generating-website-tutorials',
        'chapter-10-autonomous-functional-testing',
        'chapter-11-performance-ux-visual-testing',
        'chapter-12-security-testing-automation',
        'chapter-13-cicd-agentic-pipelines',
      ],
    },
    {
      type: 'category',
      label: 'Part V: Capstone',
      collapsed: false,
      items: [
        'chapter-14-capstone-autonomous-qa-system',
      ],
    },
  ],
};

export default sidebars;
