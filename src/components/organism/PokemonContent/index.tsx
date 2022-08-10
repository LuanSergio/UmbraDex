import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import LinearNavigation from '@components/molecules/LinearNavigation';
import PokemonHighlight from '@components/molecules/PokemonHighlight';
import PokemonBasicInformation from '@components/molecules/PokemonBasicInformation';
import PokemonDescription from '@components/molecules/PokemonDescription';
import SwitchForms from '@components/molecules/SwitchForms';
import ContentLayout from '@components/layouts/ContentLayout';
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
  const {
    query: { id },
  } = useRouter();
  const pageId = parseInt(id as string, 10);
  const [pokemon, setPokemon] = useState(defaultPokemonForm);
  const [windowWidth] = useWindowSize();

  useEffect(() => {
    sessionStorage.setItem('currentPokemonId', id as string);
  }, [id]);

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

    if (!document.body.classList.contains('initial')) {
      document.body.className = mainType;
      document.body.classList.add('body-transition');
    } else {
      document.body.className = mainType;
    }
  }, [pokemon.types]);

  return (
    <ContentLayout>
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
              evolutionChain={pokemonDetails.evolutionChain.sort(
                (evolutionChainA, evolutionChainB) => {
                  return evolutionChainA.order - evolutionChainB.order;
                },
              )}
            />
          </div>
          <div>
            {windowWidth >= 1280 && (
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
    </ContentLayout>
  );
};

export default PokemonContent;
