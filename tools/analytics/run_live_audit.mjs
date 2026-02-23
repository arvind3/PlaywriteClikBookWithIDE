import {spawnSync} from 'node:child_process';

const baseUrl = process.env.LIVE_BASE_URL;
if (!baseUrl) {
  console.error('LIVE_BASE_URL is required. Example: https://arvind3.github.io/PlaywriteClikBookWithIDE');
  process.exit(1);
}

const url = `${baseUrl.replace(/\/$/, '')}/docs/chapter-01-agentic-testing-revolution`;
const result = spawnSync(
  'npx',
  [
    '--yes',
    'tsx',
    'tools/analytics/audit_events_playwright.ts',
    '--url',
    url,
    '--output',
    'artifacts/ga4-runtime-live.json',
  ],
  {stdio: 'inherit', shell: process.platform === 'win32'}
);

process.exit(result.status ?? 1);
