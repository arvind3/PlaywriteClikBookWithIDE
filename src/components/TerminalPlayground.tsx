import React, { useState, useEffect, useRef } from 'react';
import styles from './TerminalPlayground.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface TerminalCommand {
  input: string;
  output: string;
  delay?: number;
  type?: 'command' | 'info' | 'error' | 'success';
}

interface TerminalSession {
  commands: TerminalCommand[];
  screenshots?: { step: number; file: string; caption: string }[];
}

interface TerminalPlaygroundProps {
  chapter: string;
}

export default function TerminalPlayground({ chapter }: TerminalPlaygroundProps) {
  const [session, setSession] = useState<TerminalSession | null>(null);
  const [displayedCommands, setDisplayedCommands] = useState<TerminalCommand[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const baseUrl = useBaseUrl(`/examples/${chapter}/terminal.json`);
  const screenshotBase = useBaseUrl(`/examples/${chapter}/screenshots/`);

  useEffect(() => {
    fetch(baseUrl)
      .then(r => r.json())
      .then((data: TerminalSession) => setSession(data))
      .catch(() => {
        setSession({
          commands: [
            { input: 'playwright-cli --version', output: '@playwright/cli 1.0.0', delay: 300 },
            { input: 'playwright-cli goto https://playwright.dev', output: 'Navigated to https://playwright.dev', delay: 500 },
            { input: 'playwright-cli snapshot', output: '- ref: e1\n  role: navigation\n  children:\n    - ref: e2\n      role: link\n      name: "Docs"\n    - ref: e3\n      role: link\n      name: "API"', delay: 800 },
          ],
        });
      });
  }, [baseUrl]);

  const reset = () => {
    setDisplayedCommands([]);
    setCurrentIndex(0);
    setTypedText('');
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying || !session) return;
    if (currentIndex >= session.commands.length) {
      setIsPlaying(false);
      return;
    }

    const cmd = session.commands[currentIndex];
    const delay = cmd.delay ?? 400;
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      charIndex++;
      setTypedText(cmd.input.slice(0, charIndex));
      if (charIndex >= cmd.input.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedCommands(prev => [...prev, cmd]);
          setTypedText('');
          setCurrentIndex(i => i + 1);
        }, delay);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [isPlaying, currentIndex, session]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedCommands, typedText]);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd).catch(() => {});
  };

  if (!session) {
    return <div className={styles.loading}>Loading terminal session...</div>;
  }

  const currentScreenshot = session.screenshots?.find(s => s.step === currentIndex);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.title}>playwright-cli — terminal</span>
        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={() => setIsPlaying(true)}
            disabled={isPlaying || currentIndex >= session.commands.length}
          >
            ▶ Play
          </button>
          <button className={styles.btn} onClick={reset}>
            ↺ Reset
          </button>
        </div>
      </div>

      <div className={styles.terminal} ref={terminalRef}>
        {displayedCommands.map((cmd, i) => (
          <div key={i} className={styles.commandBlock}>
            <div className={styles.commandLine}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}>{cmd.input}</span>
              <button
                className={styles.copyBtn}
                onClick={() => copyCommand(cmd.input)}
                title="Copy command"
              >
                ⎘
              </button>
            </div>
            <pre className={`${styles.output} ${cmd.type === 'error' ? styles.outputError : ''}`}>
              {cmd.output}
            </pre>
          </div>
        ))}

        {typedText && (
          <div className={styles.commandLine}>
            <span className={styles.prompt}>$</span>
            <span className={styles.command}>{typedText}</span>
            <span className={styles.cursor}>▋</span>
          </div>
        )}

        {!isPlaying && currentIndex === 0 && displayedCommands.length === 0 && (
          <div className={styles.hint}>Press ▶ Play to run the demo</div>
        )}
        {!isPlaying && currentIndex >= session.commands.length && (
          <div className={styles.done}>— session complete —</div>
        )}
      </div>

      {currentScreenshot && (
        <div className={styles.screenshot}>
          <img
            src={`${screenshotBase}${currentScreenshot.file}`}
            alt={currentScreenshot.caption}
          />
          <p className={styles.screenshotCaption}>{currentScreenshot.caption}</p>
        </div>
      )}
    </div>
  );
}
