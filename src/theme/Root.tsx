import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

import {getChapterMeta, isDocsRoute} from '../analytics/eventExtractors';
import {bookAnalyticsTrack, markOnce} from '../analytics/ga4Runtime';

function trackChapterView(pathname: string): void {
  const title = typeof document !== 'undefined' ? document.title : 'Untitled Chapter';
  const meta = getChapterMeta(pathname, title);

  if (!markOnce(`chapter_view:${pathname}`)) {
    return;
  }

  bookAnalyticsTrack('chapter_view', {
    chapter_id: meta.chapterId,
    chapter_title: meta.chapterTitle,
    content_group: meta.contentGroup,
    engagement_bucket: 'viewed',
  });
}

function bindCompletionTracking(pathname: string): () => void {
  let fired = false;

  const onScroll = (): void => {
    if (fired || !isDocsRoute(pathname)) {
      return;
    }

    const maxHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (!maxHeight) {
      return;
    }

    const pct = ((window.scrollY + window.innerHeight) / maxHeight) * 100;
    if (pct < 90) {
      return;
    }

    if (!markOnce(`chapter_complete:${pathname}`)) {
      return;
    }

    const meta = getChapterMeta(pathname, document.title);
    bookAnalyticsTrack('chapter_complete', {
      chapter_id: meta.chapterId,
      chapter_title: meta.chapterTitle,
      content_group: meta.contentGroup,
      engagement_bucket: 'completed',
    });
    fired = true;
  };

  window.addEventListener('scroll', onScroll, {passive: true});
  return () => window.removeEventListener('scroll', onScroll);
}

function bindInteractionTracking(pathname: string): () => void {
  const onClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const copyButton = target.closest('button[class*="copyButton"], button[aria-label*="copy" i]');
    if (copyButton) {
      const meta = getChapterMeta(pathname, document.title);
      bookAnalyticsTrack('code_copy', {
        chapter_id: meta.chapterId,
        chapter_title: meta.chapterTitle,
        content_group: meta.contentGroup,
        engagement_bucket: 'interaction',
      });
      return;
    }

    const tocLink = target.closest('nav.table-of-contents a, a.table-of-contents__link');
    if (tocLink) {
      const meta = getChapterMeta(pathname, document.title);
      const tocTarget = (tocLink.textContent || '').trim();
      bookAnalyticsTrack('toc_interaction', {
        chapter_id: meta.chapterId,
        chapter_title: meta.chapterTitle,
        content_group: meta.contentGroup,
        engagement_bucket: 'interaction',
        toc_target: tocTarget,
      });
    }
  };

  document.addEventListener('click', onClick, {capture: true});
  return () => document.removeEventListener('click', onClick, {capture: true});
}

export default function Root({children}: {children: React.ReactNode}): React.ReactElement {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    if (!isDocsRoute(pathname)) {
      return undefined;
    }

    trackChapterView(pathname);
    const unbindScroll = bindCompletionTracking(pathname);
    const unbindInteractions = bindInteractionTracking(pathname);

    return () => {
      unbindScroll();
      unbindInteractions();
    };
  }, [location.pathname]);

  return <>{children}</>;
}
