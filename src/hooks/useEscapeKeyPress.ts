import { useEffect } from 'react';

interface IUseEscapeKeyPressProps {
  fn: () => void;
}

export default function useEscapeKeyPress({
  fn,
}: IUseEscapeKeyPressProps): void {
  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        fn();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
}
