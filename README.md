# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Analytics (GA4 + GTM)

- Config source: `analytics/analytics.config.json`
- Contract docs: `analytics/README.md`
- KPI spec: `analytics/dashboard-kpis.md`

Commands:

- `npm run analytics:validate`: validate analytics config contract and, if `build/` exists, scan generated HTML for duplicate tag injection.
- `npm run analytics:snippets`: generate GTM/gtag snippets into `artifacts/snippets`.
- `LIVE_BASE_URL=https://arvind3.github.io/PlaywriteClikBookWithIDE npm run analytics:audit:live`: run runtime analytics audit against the live site.
