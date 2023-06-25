import { useCallback, useEffect } from 'react';

interface ControllerProps<T> {
  loader: HTMLElement;
  setSize: (size: number | ((_size: number) => number)) => Promise<T[][]>;
}

const useLoader = <T>({ loader, setSize }: ControllerProps<T>) => {
  const handleObserver = useCallback(() => {
    setSize(previousValue => previousValue + 1);
  }, [setSize]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `40px`,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleObserver, loader]);
};

export default useLoader;
