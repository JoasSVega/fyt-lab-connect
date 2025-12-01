let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  try {
    document.body.classList.add('scroll-locked');
    (document.body as any).dataset.scrollLockCount = String(lockCount);
  } catch {}
}

export function unlockScroll() {
  if (lockCount > 0) lockCount -= 1;
  try {
    if (lockCount === 0) {
      document.body.classList.remove('scroll-locked');
      delete (document.body as any).dataset.scrollLockCount;
    } else {
      (document.body as any).dataset.scrollLockCount = String(lockCount);
    }
  } catch {}
}

export function resetScrollLock() {
  lockCount = 0;
  try {
    document.body.classList.remove('scroll-locked');
    delete (document.body as any).dataset.scrollLockCount;
  } catch {}
}
