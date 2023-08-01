import { useState, useEffect, useRef, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
  'Enter',
];

const useKonamiCode = (callback: () => void, debounceTime = 2000) => {
  const [keys, setKeys] = useState<string[]>([]);

  const timeoutId = useRef(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      setKeys(prevKeys => [...prevKeys, event.key]);
      if (
        keys.length >= KONAMI_CODE.length ||
        event.code !== KONAMI_CODE[keys.length]
      ) {
        setKeys([]);
        return;
      }
      if (keys.length === KONAMI_CODE.length - 1) {
        callback();
        setKeys([]);
      }

      timeoutId.current = setTimeout(() => {
        setKeys([]);
      }, debounceTime);
    },
    [callback, debounceTime, keys],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKonamiCode;
