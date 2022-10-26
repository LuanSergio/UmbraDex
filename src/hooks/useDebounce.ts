import { useRef } from 'react';

export default function useDebounce(fn, delay) {
  const timeoutRef = useRef(null);

  function debouncedFunction(...args: unknown[]) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFunction;
}
