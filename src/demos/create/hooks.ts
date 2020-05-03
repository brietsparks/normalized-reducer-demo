import { KeyboardEvent, MutableRefObject } from 'react';

export function useEnterHandler(onEnter: () => void, ref: MutableRefObject<HTMLInputElement>) {
  return (e: KeyboardEvent) => {
    if (e.key === 'Enter' && ref?.current as HTMLElement === document.activeElement) {
      onEnter();
    }
  };
}
