import { useRef } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
import Header from '@components/molecules/Header';
import styles from './styles.module.scss';
import useController from './index.controller';

const HomeLayout = ({ pokemonList }): JSX.Element => {
  const loader = useRef(null);
  useController(loader, pokemonList);

  return (
    <>
      <Header />
      <main className="container">
        <ul className={styles.cardContainer}>
          {pokemonList.length > 1 && (
            <>
              {pokemonList.map(element => (
                <li key={element.id}>
                  <PokemonCard
                    id={element.id}
                    name={element.name}
                    types={element.types}
                    image={element.image}
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
