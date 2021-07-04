import { MutableRefObject, useEffect, useState } from 'react';

interface IController {
  pokemon: IPokemonData[];
}

const amountOfPokemonPerLoad = 24;

const useController = (
  loader: MutableRefObject<HTMLElement>,
  pokemonDataList: IPokemonData[],
): IController => {
  const [loadedPokemonCounter, setLoadedPokemonCounter] = useState(0);
  const [loadedPokemon, setLoadedPokemon] = useState<IPokemonData[]>([]);

  function handleObserver(entities: IntersectionObserverEntry[]) {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadedPokemonCounter(counter => counter + amountOfPokemonPerLoad);
    }
  }

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

  useEffect(() => {
    setLoadedPokemon([...pokemonDataList.slice(0, amountOfPokemonPerLoad)]);
  }, [pokemonDataList]);

  useEffect(() => {
    setLoadedPokemon(previousState => [
      ...previousState,
      ...pokemonDataList.slice(
        loadedPokemonCounter,
        loadedPokemonCounter + amountOfPokemonPerLoad,
      ),
    ]);
  }, [loadedPokemonCounter]);

  return { pokemon: loadedPokemon };
};

export default useController;
