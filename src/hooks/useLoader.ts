import { useCallback, useEffect } from 'react';
import useThrottleFunction from './useThrottleFunction';

interface ControllerProps<T> {
  loader: HTMLElement;
  setSize: (size: number | ((_size: number) => number)) => Promise<T[][]>;
}

const useLoader = <T>({ loader, setSize }: ControllerProps<T>) => {
  const handleObserver = useCallback(() => {
    setSize(previousValue => previousValue + 1);
  }, [setSize]);

  const throttledHandleObserver = useThrottleFunction(handleObserver, 1000);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `40px`,
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(throttledHandleObserver, options);
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      observer.disconnect();
    };
  }, [throttledHandleObserver, loader]);
};

export default useLoader;
