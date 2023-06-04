import { useEffect } from 'react';

interface UseEscapeKeyPressProps {
  fn: () => void;
}

export default function useEscapeKeyPress({
  fn,
}: UseEscapeKeyPressProps): void {
  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        fn();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [fn]);
}
