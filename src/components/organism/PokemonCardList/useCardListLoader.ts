import { MutableRefObject, useCallback, useEffect } from 'react';

interface ControllerProps {
  loader: MutableRefObject<HTMLElement>;
  shouldUpdate?: boolean;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<IBasicPokemonInfo[][]>;
}

const useCardListLoader = ({
  loader,
  setSize,
  shouldUpdate = false,
}: ControllerProps) => {
  const handleObserver = useCallback(() => {
    if (shouldUpdate) {
      setSize(previousValue => previousValue + 1);
    }
  }, [setSize, shouldUpdate]);

  // Create Observer loader
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `20px`,
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader?.current) {
      observer.observe(loader.current);
    }
  }, [loader, handleObserver]);
};

export default useCardListLoader;
