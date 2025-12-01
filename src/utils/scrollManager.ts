let lockDepth = 0;
let prevOverflow: string | null = null;

export function lockBodyScroll(): void {
  lockDepth += 1;
  if (lockDepth === 1) {
    try {
      prevOverflow = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('scroll-locked');
    } catch {}
  }
}

export function unlockBodyScroll(): void {
  if (lockDepth === 0) return;
  lockDepth -= 1;
  if (lockDepth === 0) {
    try {
      document.body.style.overflow = prevOverflow || '';
      document.body.classList.remove('scroll-locked');
      prevOverflow = null;
    } catch {}
  }
}

export function isBodyLocked(): boolean {
  return lockDepth > 0;
}

export function _resetBodyLockForTests(): void {
  lockDepth = 0;
  prevOverflow = null;
  try {
    document.body.style.overflow = '';
    document.body.classList.remove('scroll-locked');
  } catch {}
}
