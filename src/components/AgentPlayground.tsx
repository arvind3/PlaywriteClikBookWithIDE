import React, { useState, useEffect } from 'react';
import styles from './AgentPlayground.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface AgentStep {
  agent: 'planner' | 'generator' | 'healer';
  label: string;
  output: string;
  delay?: number;
}

interface AgentSession {
  steps: AgentStep[];
}

interface AgentPlaygroundProps {
  chapter: string;
}

const AGENT_CONFIG = {
  planner: { icon: '🗓', label: 'Planner Agent', color: '#7c3aed' },
  generator: { icon: '⚙️', label: 'Generator Agent', color: '#2563eb' },
  healer: { icon: '🔧', label: 'Healer Agent', color: '#16a34a' },
};

export default function AgentPlayground({ chapter }: AgentPlaygroundProps) {
  const [session, setSession] = useState<AgentSession | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<AgentStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string>('');
  const baseUrl = useBaseUrl(`/examples/${chapter}/agent-responses/session.json`);

  useEffect(() => {
    fetch(baseUrl)
      .then(r => r.json())
      .then((data: AgentSession) => setSession(data))
      .catch(() => {
        setSession({
          steps: [
            {
              agent: 'planner',
              label: 'Generating test plan...',
              output: `# Test Plan: Registration Flow\n\n## Scenarios\n\n### 1. Successful Registration\n- Navigate to /register\n- Fill: email, password, date of birth\n- Click "Create Account"\n- Assert: redirect to /verify-email\n\n### 2. Duplicate Email Error\n- Fill: existing email\n- Assert: error message shown\n\n### 3. Age Validation (under 18)\n- Fill: DOB = today - 17 years\n- Assert: "You must be 18 or older"`,
              delay: 1500,
            },
            {
              agent: 'generator',
              label: 'Generating TypeScript tests...',
              output: `import { test, expect } from '@playwright/test';\n\ntest('Successful registration', async ({ page }) => {\n  await page.goto('/register');\n  await page.getByLabel('Email').fill('new@example.com');\n  await page.getByLabel('Password').fill('SecurePass1!');\n  await page.getByRole('button', { name: 'Create Account' }).click();\n  await expect(page).toHaveURL('/verify-email');\n});`,
              delay: 2000,
            },
            {
              agent: 'healer',
              label: 'Running and healing tests...',
              output: `Running 3 tests...\n\n✅ Successful registration — PASSED\n❌ Duplicate email error — FAILED\n\nAnalyzing failure...\nExpected: 'An account with this email already exists'\nActual:   'Email already in use'\n\nApplying fix... ✅\n\n✅ All 3 tests passing`,
              delay: 2500,
            },
          ],
        });
      });
  }, [baseUrl]);

  const runPipeline = () => {
    if (!session || isRunning) return;
    setVisibleSteps([]);
    setIsRunning(true);

    let delay = 0;
    session.steps.forEach((step, index) => {
      delay += step.delay ?? 1000;
      setTimeout(() => {
        setActiveAgent(step.agent);
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, step]);
          setActiveAgent('');
          if (index === session.steps.length - 1) setIsRunning(false);
        }, 800);
      }, delay);
    });
  };

  const reset = () => {
    setVisibleSteps([]);
    setIsRunning(false);
    setActiveAgent('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>🤖 Playwright Agents Pipeline</span>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={runPipeline} disabled={isRunning}>
            {isRunning ? '⏳ Running...' : '▶ Run Pipeline'}
          </button>
          <button className={styles.btn} onClick={reset}>↺ Reset</button>
        </div>
      </div>

      <div className={styles.pipeline}>
        {(['planner', 'generator', 'healer'] as const).map((agent, i) => {
          const cfg = AGENT_CONFIG[agent];
          const isActive = activeAgent === agent;
          const isDone = visibleSteps.some(s => s.agent === agent);
          return (
            <React.Fragment key={agent}>
              <div className={`${styles.agentNode} ${isActive ? styles.agentActive : ''} ${isDone ? styles.agentDone : ''}`}>
                <span className={styles.agentIcon}>{cfg.icon}</span>
                <span className={styles.agentLabel}>{cfg.label}</span>
              </div>
              {i < 2 && <div className={`${styles.arrow} ${isDone ? styles.arrowDone : ''}`}>→</div>}
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.outputs}>
        {visibleSteps.map((step, i) => {
          const cfg = AGENT_CONFIG[step.agent];
          return (
            <div key={i} className={styles.stepOutput}>
              <div className={styles.stepHeader} style={{ borderColor: cfg.color }}>
                <span>{cfg.icon}</span>
                <span style={{ color: cfg.color }}>{cfg.label}</span>
                <span className={styles.stepLabel}>{step.label}</span>
                <span className={styles.done}>✅ Done</span>
              </div>
              <pre className={styles.stepContent}>{step.output}</pre>
            </div>
          );
        })}

        {!isRunning && visibleSteps.length === 0 && (
          <div className={styles.hint}>Press ▶ Run Pipeline to see the agents work</div>
        )}
      </div>
    </div>
  );
}
