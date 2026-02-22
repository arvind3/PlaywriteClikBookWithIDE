import React, { useState, useEffect, useRef } from 'react';
import styles from './CodePlayground.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface ManifestFile {
  component?: string;
  files?: string[];
  entryFile?: string;
}

interface CodePlaygroundProps {
  chapter: string;
}

export default function CodePlayground({ chapter }: CodePlaygroundProps) {
  const [files, setFiles] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [manifest, setManifest] = useState<ManifestFile>({});
  const [editorContent, setEditorContent] = useState<string>('');
  const baseUrl = useBaseUrl(`/examples/${chapter}/`);

  useEffect(() => {
    fetch(`${baseUrl}manifest.json`)
      .then(r => r.json())
      .then(async (m: ManifestFile) => {
        setManifest(m);
        const fileContents: Record<string, string> = {};
        for (const file of m.files ?? []) {
          try {
            const res = await fetch(`${baseUrl}${file}`);
            fileContents[file] = await res.text();
          } catch {
            fileContents[file] = `// Could not load ${file}`;
          }
        }
        setFiles(fileContents);
        const entry = m.entryFile ?? m.files?.[0] ?? '';
        setActiveFile(entry);
        setEditorContent(fileContents[entry] ?? '');
      })
      .catch(() => {
        const fallback = 'playwright.config.ts';
        const content = `import { defineConfig } from '@playwright/test';\n\nexport default defineConfig({\n  testDir: './tests',\n  use: {\n    baseURL: 'https://playwright.dev',\n  },\n});\n`;
        setFiles({ [fallback]: content });
        setActiveFile(fallback);
        setEditorContent(content);
      });
  }, [baseUrl]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    // Simulate a run result for CodePlayground (WebContainers would be real)
    setTimeout(() => {
      setOutput(
        '> npm run demo\n\n' +
        '> demo\n' +
        '> npx ts-node demo.ts\n\n' +
        'Playwright CLI demo executed successfully.\n' +
        '✓ Configuration loaded\n' +
        '✓ TypeScript compiled\n' +
        '✓ Ready for browser automation'
      );
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setEditorContent(files[activeFile] ?? '');
    setOutput('');
  };

  const handleFileSelect = (filename: string) => {
    // Save current edits
    setFiles(prev => ({ ...prev, [activeFile]: editorContent }));
    setActiveFile(filename);
    setEditorContent(files[filename] ?? '');
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.fileList}>
          {Object.keys(files).map(filename => (
            <button
              key={filename}
              className={`${styles.fileTab} ${filename === activeFile ? styles.fileTabActive : ''}`}
              onClick={() => handleFileSelect(filename)}
            >
              {filename}
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.runBtn} onClick={handleRun} disabled={isRunning}>
            {isRunning ? '⏳ Running...' : '▶ Run'}
          </button>
          <button className={styles.resetBtn} onClick={handleReset}>
            ↺ Reset
          </button>
        </div>
      </div>

      <div className={styles.editorPanel}>
        <textarea
          className={styles.editor}
          value={editorContent}
          onChange={e => setEditorContent(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>

      {output && (
        <div className={styles.outputPanel}>
          <div className={styles.outputHeader}>Output</div>
          <pre className={styles.output}>{output}</pre>
        </div>
      )}
    </div>
  );
}
