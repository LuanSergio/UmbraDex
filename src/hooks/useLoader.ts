import { useCallback, useEffect } from 'react';

interface ControllerProps<T> {
  loader: HTMLElement;
  setSize: (size: number | ((_size: number) => number)) => Promise<T[][]>;
}

const useLoader = <T>({ loader, setSize }: ControllerProps<T>) => {
  const handleObserver = useCallback(() => {
    setSize(previousValue => previousValue + 1);
  }, [setSize]);

  // Create Observer loader
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `20px`,
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader) {
      observer.observe(loader);
    }
  }, [handleObserver, loader]);
};

export default useLoader;
