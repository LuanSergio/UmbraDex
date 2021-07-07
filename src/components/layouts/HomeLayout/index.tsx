import { useRef } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
import Header from '@components/molecules/Header';
import styles from './styles.module.scss';
import useController from './index.controller';

interface HomeLayoutProps {
  pokemonList: IPokemonData[];
}

const HomeLayout = ({ pokemonList }: HomeLayoutProps): JSX.Element => {
  const loader = useRef(null);
  const { loadedPokemonList } = useController(pokemonList, loader);

  return (
    <>
      <Header />
      <main className="container">
        <ul className={styles.cardContainer}>
          {loadedPokemonList.length > 1 && (
            <>
              {loadedPokemonList.map(pokemon => (
                <li key={pokemon.id}>
                  <PokemonCard
                    id={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types}
                    image={pokemon.image}
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
