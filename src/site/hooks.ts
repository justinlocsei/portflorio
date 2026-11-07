import type { Ref } from 'react';
import { useEffect, useRef } from 'react';

/**
 * Define handlers for hotkeys
 */
export function useHotkeys(
  handlers: Record<string, undefined | (() => void)>
): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      handlers[event.key]?.();
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handlers]);
}

/**
 * An interface to frozen body scrolling
 */
type FrozenBodyScroll = {
  restore: Ref<HTMLButtonElement>;
};

/**
 * Freeze body scrolling when an arrangement is focused
 */
export function useFrozenBodyScroll(arrangement?: number): FrozenBodyScroll {
  const restore = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!arrangement) {
      return;
    }

    const previouslyFocused = document.activeElement;

    restore.current?.focus();

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      GPUBindGroup;
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }

      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [arrangement]);

  return { restore };
}
