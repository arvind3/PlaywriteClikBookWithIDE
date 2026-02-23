export type ChapterMeta = {
  chapterId: string;
  chapterTitle: string;
  contentGroup: string;
};

function normalizeTitle(title: string): string {
  const first = title.split('|')[0]?.trim();
  return first || 'Untitled Chapter';
}

export function inferChapterId(pathname: string): string {
  const docsPath = (pathname.split('/docs/')[1] || '').replace(/\/+$/, '').trim();
  if (!docsPath) {
    return 'docs-home';
  }
  const segments = docsPath.split('/').filter(Boolean);
  const leaf = segments[segments.length - 1] || 'docs-home';
  return leaf.toLowerCase();
}

export function inferContentGroup(pathname: string): string {
  if (!pathname.includes('/docs/')) {
    return 'site';
  }
  if (pathname.includes('/docs/chapter-')) {
    return 'chapter';
  }
  if (pathname.includes('/docs/tooling')) {
    return 'tooling';
  }
  return 'docs-other';
}

export function getChapterMeta(pathname: string, title: string): ChapterMeta {
  return {
    chapterId: inferChapterId(pathname),
    chapterTitle: normalizeTitle(title),
    contentGroup: inferContentGroup(pathname),
  };
}

export function isDocsRoute(pathname: string): boolean {
  return pathname.includes('/docs/');
}
