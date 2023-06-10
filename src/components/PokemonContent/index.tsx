import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import useTypeEfficacies from 'src/hooks/useTypeEfficacies';
import useWindowSize from 'src/hooks/useWindowSize';
import PokemonForm from '@domain/entities/PokemonForm';
import Pokemon from '@domain/entities/Pokemon';
import { usePokemonListContext } from 'src/contexts/PokemonListContext';
import getTypeByName from '@utils/getTypeByName';
import convertHectogramToKilogram from '@utils/convertHectogramToKilogram';
import convertDecimetersToMeters from '@utils/convertDecimetersToMeters';
import bodyDefaultClasses from 'src/constants/bodyDefaultClasses';

import ContentLayout from 'src/layouts/ContentLayout';
import PokemonStatsChart from '@components/PokemonStatsChart';
import EvolutionChain from '@components/EvolutionChain';
import PokemonTypeEfficiencyTable from '@components/PokemonTypeEfficiencyTable';
import InnerPageNavigation from '@components/InnerPageNavigation';
import PokemonHighlight from '@components/PokemonHighlight';
import PokemonBasicInformation from '@components/PokemonBasicInformation';
import PokemonDescription from '@components/PokemonDescription';
import SwitchForms from '@components/SwitchForms';

import MoveList from '@components/MoveList';

import formatAbilityName from '@utils/formatAbilityName';
import styles from './styles.module.scss';

interface PokemonContentProps {
  pokemonDetails: Pokemon;
  defaultPokemonForm: PokemonForm;
  AlternativePokemonForms: PokemonForm[];
  pokedexLimit: number;
}

const PokemonContent = ({
  AlternativePokemonForms,
  defaultPokemonForm,
  pokedexLimit,
  pokemonDetails,
}: PokemonContentProps): JSX.Element => {
  const {
    query: { id },
  } = useRouter();
  const pageId = parseInt(id as string, 10);
  const [pokemon, setPokemon] = useState(defaultPokemonForm);
  const [typesIdList, setTypesIdsList] = useState<number[]>([]);
  const { staticData } = usePokemonListContext();
  const [windowWidth] = useWindowSize();

  const { isLoading, typeEfficiency } = useTypeEfficacies({
    types: typesIdList,
  });

  useEffect(() => {
    if (!sessionStorage.getItem('currentPokemonId')) {
      sessionStorage.setItem('currentPokemonId', id as string);
    }
  }, [id]);

  const handleFormChange = useCallback((form: PokemonForm) => {
    if (form) {
      setPokemon(form);
    }
  }, []);

  useEffect(() => {
    setPokemon(defaultPokemonForm);
  }, [defaultPokemonForm]);

  useEffect(() => {
    const mainType = `${pokemon.types[0]} ${bodyDefaultClasses}`;

    if (!document.body.classList.contains('initial')) {
      document.body.className = mainType;
      document.body.classList.add('body-transition');
      return;
    }
    document.body.className = mainType;
  }, [pokemon.types]);

  useEffect(() => {
    if (pokemon?.types.length && staticData?.pokemonTypes.length) {
      const typesIds = pokemon.types.map(
        type =>
          getTypeByName({ name: type, typesList: staticData.pokemonTypes }).id,
      );
      setTypesIdsList(typesIds);
    }
  }, [pokemon?.types, staticData?.pokemonTypes]);

  return (
    <ContentLayout>
      <div
        className={`${styles.content} ${
          AlternativePokemonForms.length > 0
            ? styles['content--small']
            : styles['content--large']
        }`}
      >
        {windowWidth < 1280 && (
          <div className={styles.basicInformation}>
            <PokemonBasicInformation
              name={pokemon.name}
              pokedexIndex={defaultPokemonForm.id}
              types={pokemon.types}
            />
          </div>
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
          <div className={styles.contentOdd}>
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
          <div className={styles.contentEven}>
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

            <div className={styles.characteristics}>
              <div className={styles.abilities}>
                <h2 className={styles.abilitiesTitle}>Abilities:</h2>
                <ul className={styles.abilitiesList}>
                  {pokemon.abilities.map(ability => (
                    <li className={styles.ability} key={ability}>
                      {formatAbilityName(ability)}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className={styles.physicalDimensions}>
                <div className={styles.physicalDimensionsList}>
                  <dt className={styles.physicalDimensionsLabel}>Height:</dt>
                  <dd className={styles.physicalDimensionsValue}>
                    {convertDecimetersToMeters(pokemon.height)} M
                  </dd>
                </div>

                <div className={styles.physicalDimensionsList}>
                  <dt className={styles.physicalDimensionsLabel}>Weight:</dt>
                  <dd className={styles.physicalDimensionsValue}>
                    {convertHectogramToKilogram(pokemon.weight)} Kg
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className={styles.contentOdd}>
            <PokemonStatsChart stats={pokemon.stats} />
          </div>

          <div className={styles.contentEven}>
            <PokemonTypeEfficiencyTable
              typeEfficiency={typeEfficiency}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className={styles.moveListContainer}>
          <MoveList pokemonId={pokemon.id} />
        </div>
      </div>
      <InnerPageNavigation
        previous={`/pokemon/${pageId - 1}`}
        next={`/pokemon/${pageId + 1}`}
        disablePrevious={pageId <= 1}
        disableNext={pageId >= pokedexLimit}
      />
    </ContentLayout>
  );
};

export default PokemonContent;
