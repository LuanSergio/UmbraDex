import { MutableRefObject, useCallback, useEffect } from 'react';

interface ControllerProps {
  loader: MutableRefObject<HTMLElement>;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<IBasicPokemonInfo[][]>;
}

const useController = ({ loader, setSize }: ControllerProps) => {
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
    if (loader?.current) {
      observer.observe(loader.current);
    }
  }, [loader, handleObserver]);
};

export default useController;
