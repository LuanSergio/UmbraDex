import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import LinearNavigation from '@components/molecules/LinearNavigation';
import PokemonHighlight from '@components/molecules/PokemonHighlight';
import PokemonBasicInformation from '@components/molecules/PokemonBasicInformation';
import getPokemonDetailsData from '@utils/getPokemonDetailsData';
import SwitchForms from '@components/molecules/SwitchForms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface IPokemonDetailsProps {
  pokemonDetails: IPokemonDetails;
  defaultPokemonForm: PokemonForm;
  AlternativePokemonForms: PokemonForm[];
  pokedexLimit: number;
}

const Pokemon = ({
  defaultPokemonForm,
  AlternativePokemonForms,
  pokedexLimit,
  pokemonDetails,
}: IPokemonDetailsProps): JSX.Element => {
  const router = useRouter();
  const pageId = parseInt(router.query.id as string, 10);
  const [pokemon, setPokemon] = useState(defaultPokemonForm);
  function handleFormChange(form: PokemonForm) {
    setPokemon(form);
  }

  useEffect(() => {
    setPokemon(defaultPokemonForm);
  }, [defaultPokemonForm]);

  return (
    <>
      <Head>
        <title key="title">UmbraDex | {defaultPokemonForm.name}</title>
      </Head>
      <div className={`${styles.content} ${styles[pokemon.types[0]]}`}>
        <DefaultLayout>
          <div
            className={
              AlternativePokemonForms.length > 0
                ? styles.smallHolder
                : styles.holder
            }
          >
            {AlternativePokemonForms.length > 0 && (
              <SwitchForms
                pokemon={pokemon}
                handleFormChange={handleFormChange}
                defaultPokemonForm={defaultPokemonForm}
                alternativePokemonForms={AlternativePokemonForms}
              />
            )}
            <div className={styles.container}>
              <PokemonHighlight
                japaneseName={pokemonDetails.japaneseName}
                image={pokemon.image}
                name={pokemon.name}
              />
              <PokemonBasicInformation
                name={pokemon.name}
                pokedexIndex={defaultPokemonForm.id}
                types={pokemon.types}
                descriptions={pokemonDetails.descriptions}
              />
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
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params;
  const pokemonIdAsNumber = parseInt(id as string, 10);
  const pokemonForms = await getPokemonDetailsData(pokemonIdAsNumber);

  const pokemonDetails = { ...pokemonForms };
  const defaultPokemonForm = pokemonForms.forms.find(form => form.isDefault);
  const AlternativePokemonForms = pokemonForms.forms.filter(
    form => !form.isDefault,
  );

  const { pokedexLimit } = pokemonForms;

  return {
    props: {
      pokemonDetails,
      AlternativePokemonForms,
      defaultPokemonForm,
      pokedexLimit,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
