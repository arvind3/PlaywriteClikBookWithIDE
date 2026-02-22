import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FEATURES = [
  {
    icon: '⚡',
    title: '4–10× Token Reduction',
    description:
      'Playwright CLI uses YAML snapshots with element refs instead of full DOM trees — dramatically reducing tokens consumed per browser task.',
  },
  {
    icon: '🤖',
    title: 'Three Playwright Agents',
    description:
      'Planner generates test plans from goals, Generator writes TypeScript specs from plans, Healer auto-fixes failing tests using the latest DOM state.',
  },
  {
    icon: '🔌',
    title: 'Universal Agent Integration',
    description:
      'Works with Claude Code, GitHub Copilot, Cursor, and any agent that can call a shell command — no protocol adapters required.',
  },
  {
    icon: '🧪',
    title: 'Autonomous Test Suites',
    description:
      'From a single URL and goal statement, generate, execute, and maintain a full test suite with zero manual selector maintenance.',
  },
  {
    icon: '🔒',
    title: 'Security & Performance',
    description:
      'Built-in patterns for Core Web Vitals measurement, XSS detection, security headers validation, and accessibility auditing.',
  },
  {
    icon: '🚀',
    title: 'CI/CD Ready',
    description:
      'Drop-in GitHub Actions pipeline with agentic plan→generate→test→heal→deploy workflow and automatic PR healing.',
  },
];

const CHAPTERS = [
  { num: '01', slug: 'chapter-01-agentic-testing-revolution', title: 'The Agentic Testing Revolution' },
  { num: '02', slug: 'chapter-02-cli-vs-mcp-architecture', title: 'CLI vs MCP Architecture' },
  { num: '03', slug: 'chapter-03-installation-and-first-run', title: 'Installation & First Run' },
  { num: '04', slug: 'chapter-04-core-cli-commands', title: 'Core CLI Commands' },
  { num: '05', slug: 'chapter-05-snapshot-state-management', title: 'Snapshot State Management' },
  { num: '06', slug: 'chapter-06-connecting-ai-agents', title: 'Connecting AI Agents' },
  { num: '07', slug: 'chapter-07-playwright-agents-planner-generator-healer', title: 'Planner, Generator & Healer' },
  { num: '08', slug: 'chapter-08-autonomous-website-discovery', title: 'Autonomous Website Discovery' },
  { num: '09', slug: 'chapter-09-generating-website-tutorials', title: 'Generating Website Tutorials' },
  { num: '10', slug: 'chapter-10-autonomous-functional-testing', title: 'Autonomous Functional Testing' },
  { num: '11', slug: 'chapter-11-performance-ux-visual-testing', title: 'Performance, UX & Visual Testing' },
  { num: '12', slug: 'chapter-12-security-testing-automation', title: 'Security Testing Automation' },
  { num: '13', slug: 'chapter-13-cicd-agentic-pipelines', title: 'CI/CD Agentic Pipelines' },
  { num: '14', slug: 'chapter-14-capstone-autonomous-qa-system', title: 'Capstone: Autonomous QA System' },
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Playwright CLI — The Complete Guide"
      description="Master token-efficient browser automation with Playwright CLI, Playwright Agents, and autonomous test generation.">
      {/* Hero */}
      <header className={styles.heroBanner}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.badge}>New in 2025</span>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>14</span>
                <span className={styles.statLabel}>Chapters</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4–10×</span>
                <span className={styles.statLabel}>Token Reduction</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3</span>
                <span className={styles.statLabel}>AI Agents</span>
              </div>
            </div>
            <div className={styles.heroCTA}>
              <Link className="button button--primary button--lg" to="/docs/chapter-01-agentic-testing-revolution">
                Start Reading →
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                Book Overview
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Audience pills */}
        <section className={styles.audienceSection}>
          <div className="container">
            <p className={styles.audienceLabel}>Written for</p>
            <div className={styles.audiencePills}>
              <span className={styles.pillQa}>QA Engineers</span>
              <span className={styles.pillDev}>Full-Stack Developers</span>
              <span className={styles.pillAi}>AI / Agent Engineers</span>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className={styles.featuresSection}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>What You Will Master</Heading>
            <div className={styles.featuresGrid}>
              {FEATURES.map((f) => (
                <div key={f.title} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <Heading as="h3" className={styles.featureTitle}>{f.title}</Heading>
                  <p className={styles.featureDesc}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter list */}
        <section className={styles.chaptersSection}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>All 14 Chapters</Heading>
            <div className={styles.chaptersGrid}>
              {CHAPTERS.map((ch) => (
                <Link key={ch.slug} to={`/docs/${ch.slug}`} className={styles.chapterCard}>
                  <span className={styles.chapterNum}>{ch.num}</span>
                  <span className={styles.chapterTitle}>{ch.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={styles.ctaSection}>
          <div className="container">
            <Heading as="h2">Ready to build autonomous testing systems?</Heading>
            <p>Start with Chapter 1 and follow the complete arc from architecture to capstone project.</p>
            <Link className="button button--primary button--lg" to="/docs/chapter-01-agentic-testing-revolution">
              Begin Chapter 1 →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
