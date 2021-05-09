import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
import Header from '@components/molecules/Header';
import styles from './styles.module.scss';

const HomeLayout = (): JSX.Element => {
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

    responses.forEach(pokemon => {
      const pokemonData = {
        name: pokemon.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.data.id}.png`,
        types: pokemon.data.types.map(item => item.type.name),
        id: pokemon.data.id,
      };

      pokemonInformation.push(pokemonData);
    });

    return pokemonInformation;
  }

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function setPokemonData() {
      setPokemon(await getPokemonInformation());
    }
    setPokemonData();
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <ul className={styles.cardContainer}>
          {pokemon.map(element => (
            <li key={element.id}>
              <PokemonCard
                id={element.id}
                name={element.name}
                types={element.types}
                imageUrl={element.image}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomeLayout;
