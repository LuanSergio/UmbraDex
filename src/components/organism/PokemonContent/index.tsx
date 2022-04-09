import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import LinearNavigation from '@components/molecules/LinearNavigation';
import PokemonHighlight from '@components/molecules/PokemonHighlight';
import PokemonBasicInformation from '@components/molecules/PokemonBasicInformation';
import PokemonDescription from '@components/molecules/PokemonDescription';
import SwitchForms from '@components/molecules/SwitchForms';
import DefaultLayout from '@components/layouts/DefaultLayout';
import useWindowSize from '@hooks/useWindowSize';
import PokemonStats from '@components/molecules/PokemonStats';
import EvolutionChain from '@components/molecules/EvolutionChain';

import styles from './styles.module.scss';

interface IPokemonContentProps {
  pokemonDetails: IPokemonDetails;
  defaultPokemonForm: IPokemonForm;
  AlternativePokemonForms: IPokemonForm[];
  pokedexLimit: number;
}

const PokemonContent = ({
  AlternativePokemonForms,
  defaultPokemonForm,
  pokedexLimit,
  pokemonDetails,
}: IPokemonContentProps): JSX.Element => {
  const router = useRouter();
  const pageId = parseInt(router.query.id as string, 10);
  const [pokemon, setPokemon] = useState(defaultPokemonForm);
  const [windowWidth] = useWindowSize();

  const handleFormChange = useCallback((form: IPokemonForm) => {
    if (form) {
      setPokemon(form);
    }
  }, []);

  useEffect(() => {
    setPokemon(defaultPokemonForm);
  }, [defaultPokemonForm]);

  useEffect(() => {
    const mainType = pokemon.types[0];
    document.body.className = mainType;
  }, [pokemon.types]);

  return (
    <div className={`${styles.content} ${styles[pokemon.types[0]]}`}>
      <DefaultLayout>
        <div
          className={
            AlternativePokemonForms.length > 0
              ? styles.smallHolder
              : styles.holder
          }
        >
          {windowWidth < 1280 && (
            <PokemonBasicInformation
              name={pokemon.name}
              pokedexIndex={defaultPokemonForm.id}
              types={pokemon.types}
            />
          )}

          {AlternativePokemonForms.length > 0 && (
            <SwitchForms
              pokemon={pokemon}
              handleFormChange={handleFormChange}
              defaultPokemonForm={defaultPokemonForm}
              alternativePokemonForms={AlternativePokemonForms}
            />
          )}

          <div className={styles.container}>
            <div>
              <PokemonHighlight
                japaneseName={pokemonDetails.japaneseName}
                image={pokemon.image}
                name={pokemon.name}
              />
              <EvolutionChain
                currentId={defaultPokemonForm.id}
                evolutionChain={pokemonDetails.evolutionChain}
              />
            </div>
            <div>
              {windowWidth > 1280 && (
                <PokemonBasicInformation
                  name={pokemon.name}
                  pokedexIndex={defaultPokemonForm.id}
                  types={pokemon.types}
                />
              )}

              <PokemonDescription
                pokedexIndex={defaultPokemonForm.id}
                descriptions={pokemonDetails.descriptions}
              />
            </div>
            <PokemonStats stats={pokemon.stats} />
          </div>
          <LinearNavigation
            previous={`/pokemon/${pageId - 1}`}
            next={`/pokemon/${pageId + 1}`}
            disablePrevious={pageId <= 1}
            disableNext={pageId >= pokedexLimit}
          />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default PokemonContent;
