import { MutableRefObject, useEffect, useState } from 'react';
import axios from 'axios';

interface IController {
  pokemon: IPokemonData[];
}

const useController = (loader: MutableRefObject<HTMLElement>): IController => {
  const [pokemonDataList, setPokemonDataList] = useState<IPokemonData[]>([]);
  const [loadedPokemonCounter, setLoadedPokemonCounter] = useState(0);
  const [loadedPokemon, setLoadedPokemon] = useState<IPokemonData[]>([]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadedPokemonCounter(counter => counter + 24);
    }
  };

  async function getAvailablePokemonQuantity() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokedex/1/');
    return response.data.pokemon_entries.length;
  }

  async function fetchPokemonData() {
    const quantity: number = await getAvailablePokemonQuantity();
    const pokemonUrlList = [];

    for (let i = 1; i <= quantity; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      pokemonUrlList.push(url);
    }

    const promises = pokemonUrlList.map(url => axios.get(url));
    const responses = await axios.all(promises);

    return responses;
  }

  async function getPokemonDataList() {
    const responses = await fetchPokemonData();
    const pokemonDataArray = [];

    responses.forEach(response => {
      const pokemonData: IPokemonData = {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types.map(item => item.type.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
      };

      pokemonDataArray.push(pokemonData);
    });

    return pokemonDataArray;
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
    async function setPokemonData() {
      setPokemonDataList(await getPokemonDataList());
    }
    setPokemonData();
  }, []);

  useEffect(() => {
    setLoadedPokemon([...pokemonDataList.slice(0, 24)]);
  }, [pokemonDataList]);

  useEffect(() => {
    setLoadedPokemon(previousState => [
      ...previousState,
      ...pokemonDataList.slice(loadedPokemonCounter, loadedPokemonCounter + 24),
    ]);
  }, [loadedPokemonCounter]);

  return { pokemon: loadedPokemon };
};

export default useController;
