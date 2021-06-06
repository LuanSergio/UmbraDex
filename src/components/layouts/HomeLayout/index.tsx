import { useRef } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
import Header from '@components/molecules/Header';
import styles from './styles.module.scss';
import useController from './index.controller';

const HomeLayout = (): JSX.Element => {
  const loader = useRef(null);
  const { pokemon } = useController(loader);

  return (
    <>
      <Header />
      <main className="container">
        <ul className={styles.cardContainer}>
          {pokemon.length > 1 && (
            <>
              {pokemon.map(element => (
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
