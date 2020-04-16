import { KeyboardEvent, useRef } from 'react';

export function useEnterHandler(onEnter: () => void) {
  const ref = useRef<HTMLInputElement>();

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && ref.current && ref.current as HTMLElement === document.activeElement) {
      onEnter();
    }
  };

  return {
    ref,
    onKeyPress: handleKeypress
  };
}
