import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import useTypeEfficacies from '@hooks/useTypeEfficacies';
import getTypeByName from '@utils/getTypeByName';

import useWindowSize from '@hooks/useWindowSize';
import { usePokemonListContext } from 'src/presentation/contexts/PokemonListContext';
import convertHectogramToKilogram from '@utils/convertHectogramToKilogram';
import convertDecimetersToMeters from '@utils/convertDecimetersToMeters';
import bodyDefaultClasses from '@constants/bodyDefaultClasses';

import ContentLayout from '@layouts/ContentLayout';
import PokemonStats from 'src/presentation/components/PokemonStats';
import EvolutionChain from 'src/presentation/components/EvolutionChain';
import PokemonTypeEfficiency from 'src/presentation/components/PokemonTypeEfficiency';
import InnerPageNavigation from 'src/presentation/components/InnerPageNavigation';
import PokemonHighlight from 'src/presentation/components/PokemonHighlight';
import PokemonBasicInformation from 'src/presentation/components/PokemonBasicInformation';
import PokemonDescription from 'src/presentation/components/PokemonDescription';
import SwitchForms from 'src/presentation/components/SwitchForms';

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

  const handleFormChange = useCallback((form: IPokemonForm) => {
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

            <dl className={styles.characteristic}>
              <div>
                <dt className={styles.characteristicLabel}>Height:</dt>
                <dd className={styles.characteristicValue}>
                  {convertDecimetersToMeters(pokemon.height)} M
                </dd>
              </div>

              <div>
                <dt className={styles.characteristicLabel}>Weight:</dt>
                <dd className={styles.characteristicValue}>
                  {convertHectogramToKilogram(pokemon.weight)} Kg
                </dd>
              </div>
            </dl>
          </div>
          <div className={styles.contentOdd}>
            <PokemonStats stats={pokemon.stats} />
          </div>

          <div className={styles.contentEven}>
            <PokemonTypeEfficiency
              typeEfficiency={typeEfficiency}
              isLoading={isLoading}
            />
          </div>
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
