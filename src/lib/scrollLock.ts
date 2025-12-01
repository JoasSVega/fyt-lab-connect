let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  try {
    document.body.classList.add('scroll-locked');
    document.body.dataset.scrollLockCount = String(lockCount);
  } catch (error: unknown) {
    console.warn('Failed to lock scroll:', error);
  }
}

export function unlockScroll() {
  if (lockCount > 0) lockCount -= 1;
  try {
    if (lockCount === 0) {
      document.body.classList.remove('scroll-locked');
      delete document.body.dataset.scrollLockCount;
    } else {
      document.body.dataset.scrollLockCount = String(lockCount);
    }
  } catch (error: unknown) {
    console.warn('Failed to unlock scroll:', error);
  }
}

export function resetScrollLock() {
  lockCount = 0;
  try {
    document.body.classList.remove('scroll-locked');
    delete document.body.dataset.scrollLockCount;
  } catch (error: unknown) {
    console.warn('Failed to reset scroll lock:', error);
  }
}
