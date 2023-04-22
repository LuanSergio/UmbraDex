import { useMemo } from 'react';

type CallBackFunction = (...args: unknown[]) => void;

export function throttle<F extends CallBackFunction>(
  func: F,
  wait = 300,
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let lastTime = 0;

  return function fn(this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

export default function useThrottle(
  callback: CallBackFunction,
  cooldown: number,
) {
  return useMemo(() => throttle(callback, cooldown), [callback, cooldown]);
}
