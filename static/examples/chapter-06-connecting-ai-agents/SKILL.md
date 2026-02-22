---
name: playwright-cli
description: Control a web browser using Playwright CLI for navigation, interaction, testing, and screenshot capture. Use this skill for any task that requires browsing websites, filling forms, clicking buttons, capturing screenshots, or automating browser workflows. Triggers on: "open browser", "navigate to", "click on website", "take screenshot of", "test the website", "fill form".
---

## Available Commands

Navigate:    `playwright-cli goto [url]`
Inspect:     `playwright-cli snapshot` → returns YAML of interactive elements with refs
Click:       `playwright-cli click [ref=eN]`
Fill:        `playwright-cli fill [ref=eN] [value]`
Type:        `playwright-cli type [ref=eN] [text]`
Screenshot:  `playwright-cli screenshot --path=[filename].png`
Select:      `playwright-cli select [ref=eN] [option]`
Check:       `playwright-cli check [ref=eN]`
Press key:   `playwright-cli press [Key]`
Execute JS:  `playwright-cli eval "[javascript]"`
Multi-session: add `-s=[name]` flag to any command

## Workflow

1. `goto` the URL
2. `snapshot` to see interactive elements (refs like e1, e2, e42)
3. Use refs from snapshot for all interactions
4. Re-`snapshot` only after navigation
5. `screenshot` to capture evidence

## Notes

- Use `playwright-cli`, NOT `playwright test` or `npx playwright`
- Snapshot refs (e.g., [ref=e42]) are more reliable than CSS selectors
- Call `snapshot` once, use refs for multiple actions before re-snapshotting
