import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
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

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function setPokemonData() {
      setPokemons(await getPokemonInformation());
    }
    setPokemonData();
  }, []);

  return (
    <>
      <header>
        <h1>UmbraDex</h1>
      </header>
      <main className="container">
        <ul className={styles.cardContainer}>
          {pokemons.map(pokemon => (
            <li key={pokemon.id}>
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                imageUrl={pokemon.image}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomeLayout;
