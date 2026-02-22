/**
 * Capstone: Autonomous QA System
 * Orchestrates Playwright CLI agents in a full autonomous pipeline
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface QAConfig {
  targetUrl: string;
  outputDir: string;
  agents: {
    planner: boolean;
    generator: boolean;
    healer: boolean;
  };
  checks: {
    functional: boolean;
    performance: boolean;
    security: boolean;
    visual: boolean;
  };
}

async function runAutonomousQA(config: QAConfig): Promise<void> {
  console.log('🤖 Autonomous QA System starting...');
  console.log(`   Target: ${config.targetUrl}`);
  console.log('');

  // Phase 1: Discovery
  console.log('📡 Phase 1: Website Discovery');
  const discoveryOutput = execSync(
    `playwright-cli goto ${config.targetUrl} && playwright-cli snapshot`,
    { encoding: 'utf-8' }
  );
  const features = extractFeatures(discoveryOutput);
  console.log(`   Found ${features.length} features to test`);

  // Phase 2: Plan generation
  if (config.agents.planner) {
    console.log('');
    console.log('🗓 Phase 2: Test Plan Generation');
    execSync(
      `npx playwright test --agent=planner --goal="Test all features of ${config.targetUrl}" --output=${config.outputDir}/test-plan.md`,
      { stdio: 'inherit' }
    );
  }

  // Phase 3: Test generation
  if (config.agents.generator) {
    console.log('');
    console.log('⚙️  Phase 3: Test Suite Generation');
    execSync(
      `npx playwright test --agent=generator --plan=${config.outputDir}/test-plan.md --output=${config.outputDir}/tests/`,
      { stdio: 'inherit' }
    );
  }

  // Phase 4: Execution
  console.log('');
  console.log('▶️  Phase 4: Test Execution');
  const testArgs = buildTestArgs(config);
  try {
    execSync(`npx playwright test ${testArgs}`, { stdio: 'inherit' });
    console.log('✅ All tests passed!');
  } catch {
    console.log('⚠️  Some tests failed — initiating healer...');

    // Phase 5: Healing
    if (config.agents.healer) {
      console.log('');
      console.log('🩹 Phase 5: Auto-Healing');
      execSync(
        `npx playwright test --agent=healer --results=results.json --output=${config.outputDir}/healed/`,
        { stdio: 'inherit' }
      );
    }
  }

  // Phase 6: Report
  console.log('');
  console.log('📊 Phase 6: Report Generation');
  generateReport(config.outputDir);
}

function extractFeatures(snapshotOutput: string): string[] {
  // Extract interactive elements from YAML snapshot
  const featurePattern = /role=(button|link|input|form)/g;
  const matches = snapshotOutput.match(featurePattern) || [];
  return [...new Set(matches)];
}

function buildTestArgs(config: QAConfig): string {
  const args: string[] = [`${config.outputDir}/tests/`];
  if (config.checks.performance) args.push('--project=performance');
  if (config.checks.security) args.push('--project=security');
  if (config.checks.visual) args.push('--update-snapshots');
  return args.join(' ');
}

function generateReport(outputDir: string): void {
  const reportPath = path.join(outputDir, 'qa-report.md');
  const report = `# Autonomous QA Report\n\nGenerated: ${new Date().toISOString()}\n\n## Summary\n\n- Tests generated: $(find ${outputDir}/tests -name "*.spec.ts" | wc -l)\n- Tests passed: See playwright-report/index.html\n- Healed tests: $(find ${outputDir}/healed -name "*.spec.ts" 2>/dev/null | wc -l || echo 0)\n`;
  fs.writeFileSync(reportPath, report);
  console.log(`   Report saved to ${reportPath}`);
}

// Run the system
const config: QAConfig = {
  targetUrl: process.env.TARGET_URL || 'https://example.com',
  outputDir: './qa-output',
  agents: { planner: true, generator: true, healer: true },
  checks: { functional: true, performance: true, security: true, visual: true },
};

runAutonomousQA(config).catch(console.error);
