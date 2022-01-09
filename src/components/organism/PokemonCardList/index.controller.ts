import { MutableRefObject, useCallback, useEffect, useState } from 'react';

interface ControllerProps {
  pokemonList: IBasicPokemonInfo[];
  loader: MutableRefObject<HTMLElement>;
}

interface IController {
  loadedPokemonList: IBasicPokemonInfo[];
}

const amountOfPokemonPerLoad = 24;

const useController = ({
  pokemonList,
  loader,
}: ControllerProps): IController => {
  const [loadedPokemonCounter, setLoadedPokemonCounter] = useState(0);
  const [loadedPokemon, setLoadedPokemon] = useState<IBasicPokemonInfo[]>([]);

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      if (pokemonList.length > loadedPokemonCounter) {
        const target = entities[0];
        if (target.isIntersecting) {
          setLoadedPokemonCounter(counter => counter + amountOfPokemonPerLoad);
        }
      }
    },
    [loadedPokemonCounter, pokemonList.length],
  );

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

  // Update loaded pokemon list
  useEffect(() => {
    setLoadedPokemon(previousState => [
      ...previousState,
      ...pokemonList.slice(
        loadedPokemonCounter,
        loadedPokemonCounter + amountOfPokemonPerLoad,
      ),
    ]);
  }, [loadedPokemonCounter, pokemonList]);

  return { loadedPokemonList: loadedPokemon };
};

export default useController;
