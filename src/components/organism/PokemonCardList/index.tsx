import { useRef } from 'react';
import PokemonCard from '@components/molecules/PokemonCard';
import styles from './styles.module.scss';
import useController from './index.controller';

interface PokemonCardListProps {
  pokemonList: IPokemonBasicInfo[];
}

const PokemonCardList = ({
  pokemonList,
}: PokemonCardListProps): JSX.Element => {
  const loader = useRef(null);
  const { loadedPokemonList } = useController({ pokemonList, loader });

  return (
    <>
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
      </ul>
      <div ref={loader} />
    </>
  );
};

export default PokemonCardList;
