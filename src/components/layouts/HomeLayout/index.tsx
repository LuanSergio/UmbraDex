import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from '../../molecules/PokemonCard';
import styles from './styles.module.scss';

const HomeLayout = (): JSX.Element => {
  async function getPokemonQuantity() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokedex/1/');
    return response.data.pokemon_entries.length;
  }

  async function getPokemonDataList() {
    const quantity: number = await getPokemonQuantity();
    const pokemonDataList = [];

    for (let i = 1; i <= quantity; i++) {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        const response = await axios.get(url);
        const pokemonData = {
          name: response.data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
          types: response.data.types.map(item => item.type.name),
          id: response.data.id,
        };
        pokemonDataList.push(pokemonData);
      } catch (error) {
        console.log(`Error occured on main endpoint: ${error.message}`);
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const response = await axios.get(url);
        const pokemonData = {
          name: response.data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
          types: response.data.types.map(item => item.type.name),
          id: response.data.id,
        };
        pokemonDataList.push(pokemonData);
      }
    }
    console.clear();
    return Array.from(pokemonDataList);
  }

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function setPokemonData() {
      setPokemons(await getPokemonDataList());
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
