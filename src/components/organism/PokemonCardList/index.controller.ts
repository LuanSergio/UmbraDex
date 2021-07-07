import { MutableRefObject, useEffect, useState } from 'react';

interface ControllerProps {
  pokemonList: IPokemonData[];
  loader: MutableRefObject<HTMLElement>;
}

interface IController {
  loadedPokemonList: IPokemonData[];
}

const amountOfPokemonPerLoad = 24;

const useController = ({
  pokemonList,
  loader,
}: ControllerProps): IController => {
  const [loadedPokemonCounter, setLoadedPokemonCounter] = useState(0);
  const [loadedPokemon, setLoadedPokemon] = useState<IPokemonData[]>([]);

  function handleObserver(entities: IntersectionObserverEntry[]) {
    if (pokemonList.length > loadedPokemonCounter) {
      const target = entities[0];
      if (target.isIntersecting) {
        setLoadedPokemonCounter(counter => counter + amountOfPokemonPerLoad);
      }
    }
  }

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
  }, [loader]);

  // Update loaded pokemon list
  useEffect(() => {
    setLoadedPokemon(previousState => [
      ...previousState,
      ...pokemonList.slice(
        loadedPokemonCounter,
        loadedPokemonCounter + amountOfPokemonPerLoad,
      ),
    ]);
  }, [loadedPokemonCounter]);

  return { loadedPokemonList: loadedPokemon };
};

export default useController;
