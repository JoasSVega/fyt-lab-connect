let lockDepth = 0;
let prevBodyOverflow: string | null = null;
let prevHtmlOverflow: string | null = null;

export function lockBodyScroll(): void {
  lockDepth += 1;
  if (lockDepth === 1) {
    try {
      prevBodyOverflow = document.body.style.overflow || '';
      prevHtmlOverflow = document.documentElement.style.overflow || '';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('scroll-locked');
    } catch {}
  }
}

export function unlockBodyScroll(): void {
  if (lockDepth === 0) return;
  lockDepth -= 1;
  if (lockDepth === 0) {
    try {
      document.body.style.overflow = prevBodyOverflow || '';
      document.documentElement.style.overflow = prevHtmlOverflow || '';
      document.body.classList.remove('scroll-locked');
      prevBodyOverflow = null;
      prevHtmlOverflow = null;
    } catch {}
  }
}

export function isBodyLocked(): boolean {
  return lockDepth > 0;
}

export function _resetBodyLockForTests(): void {
  lockDepth = 0;
  prevBodyOverflow = null;
  prevHtmlOverflow = null;
  try {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.classList.remove('scroll-locked');
  } catch {}
}
