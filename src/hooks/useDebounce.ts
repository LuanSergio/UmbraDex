import { useRef } from 'react';

export default function useDebounce(
  fn: (...args: unknown[]) => unknown,
  delay: number,
) {
  const timeoutRef = useRef(null);

  function debouncedFunction(...args: unknown[]) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFunction;
}
