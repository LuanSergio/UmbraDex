import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
import Header from '@components/molecules/Header';
import { nanoid } from 'nanoid';
import styles from './styles.module.scss';

const HomeLayout = (): JSX.Element => {
  const loader = useRef<HTMLDivElement>(null);
  const [pokemonCounter, setPokemonCounter] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [pageYOffset, setPageYOffset] = useState(0);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPageYOffset(window.pageYOffset);
      setPokemonCounter(counter => counter + 100);
    }
  };

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
  }, []);

  useEffect(() => {
    window.scroll({ top: pageYOffset });
  }, [pokemon]);

  useEffect(() => {
    const count = pokemon.length;
    setPokemon(previousState => [
      ...previousState,
      ...pokemonList.slice(count, count + 50),
    ]);
  }, [pokemonCounter]);

  async function getPokemonQuantity() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokedex/1/');
    return response.data.pokemon_entries.length;
  }

  async function fetchPokemonData() {
    const quantity: number = await getPokemonQuantity();
    const pokemonUrlList = [];

    for (let i = 1; i <= quantity; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      pokemonUrlList.push(url);
    }

    const promises = pokemonUrlList.map(url => axios.get(url));
    const response = await axios.all(promises);

    return response;
  }

  async function getPokemonInformation() {
    const responses = await fetchPokemonData();
    const pokemonInformation = [];

    responses.forEach(response => {
      const pokemonData = {
        name: response.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
        types: response.data.types.map(item => item.type.name),
        id: response.data.id,
      };

      pokemonInformation.push(pokemonData);
    });

    return pokemonInformation;
  }

  useEffect(() => {
    setPokemon([...pokemonList.slice(0, 24)]);
  }, [pokemonList]);

  useEffect(() => {
    async function setPokemonData() {
      setPokemonList(await getPokemonInformation());
    }
    setPokemonData();
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <ul className={styles.cardContainer}>
          {pokemon.length > 1 && (
            <>
              {pokemon.map(element => (
                <li key={nanoid()}>
                  <PokemonCard
                    id={element.id}
                    name={element.name}
                    types={element.types}
                    imageUrl={element.image}
                  />
                </li>
              ))}
            </>
          )}

          <div className="loading" ref={loader}>
            <h2>Loading...</h2>
          </div>
        </ul>
      </main>
    </>
  );
};

export default HomeLayout;
