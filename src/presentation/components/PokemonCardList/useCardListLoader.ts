import { useCallback, useEffect } from 'react';
import PokemonSummary from '@domain/entities/PokemonSummary';

interface ControllerProps {
  loader: HTMLElement;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<PokemonSummary[][]>;
}

const useCardListLoader = ({ loader, setSize }: ControllerProps) => {
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

export default useCardListLoader;
