import { execSync } from 'child_process';

/**
 * TypeScript wrapper for Playwright CLI
 * Makes it easy to use playwright-cli from any Node.js agent
 */
class PlaywrightCLIAgent {
  private session: string;

  constructor(sessionName = 'default') {
    this.session = sessionName;
  }

  private run(command: string): string {
    try {
      return execSync(`playwright-cli -s=${this.session} ${command}`, {
        encoding: 'utf-8',
        timeout: 30000,
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
    } catch (error: any) {
      const stderr = error.stderr?.toString() ?? '';
      throw new Error(`playwright-cli error: ${stderr || error.message}`);
    }
  }

  goto(url: string): string {
    return this.run(`goto ${url}`);
  }

  snapshot(): string {
    return this.run('snapshot');
  }

  click(ref: string): string {
    return this.run(`click [ref=${ref}]`);
  }

  fill(ref: string, value: string): string {
    return this.run(`fill [ref=${ref}] "${value}"`);
  }

  press(key: string): string {
    return this.run(`press ${key}`);
  }

  screenshot(path: string): string {
    return this.run(`screenshot --path=${path}`);
  }

  eval(js: string): string {
    return this.run(`eval "${js}"`);
  }
}

// Usage example
const browser = new PlaywrightCLIAgent('my-session');

async function main() {
  browser.goto('https://playwright.dev');
  const snapshot = browser.snapshot();
  console.log('Page snapshot:');
  console.log(snapshot);
  browser.screenshot('playwright-home.png');
  console.log('Screenshot saved!');
}

main();
