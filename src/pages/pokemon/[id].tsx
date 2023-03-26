import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import PokemonContent from '@components/organism/PokemonContent';

import getPokemonDetailsData from '@requests/getPokemonDetailsData';
import getPokedexLimit from '@requests/getPokedexLimit';
import Header from '@components/molecules/Header';
import { PokemonListContextProvider } from '@contexts/PokemonListContext';
import { ThemeContextProvider } from '@contexts/ThemeContext';
import getGenerations from '@requests/getGenerations';
import getPokemonTypes from '@requests/getPokemonTypes';

interface IPokemonDetailsProps {
  pokemonDetails: IPokemonDetails;
  defaultPokemonForm: IPokemonForm;
  AlternativePokemonForms: IPokemonForm[];
  staticData: {
    pokedexLimit: number;
    generations: IGeneration[];
    pokemonTypes: IPokemonType[];
  };
}

const Pokemon = ({
  defaultPokemonForm,
  AlternativePokemonForms,
  pokemonDetails,
  staticData,
}: IPokemonDetailsProps): JSX.Element => {
  return (
    <>
      <Head>
        <title key="title">{defaultPokemonForm.name} | UmbraDex</title>
      </Head>

      <PokemonListContextProvider staticData={staticData}>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>

        <PokemonContent
          AlternativePokemonForms={AlternativePokemonForms}
          defaultPokemonForm={defaultPokemonForm}
          pokedexLimit={staticData.pokedexLimit}
          pokemonDetails={pokemonDetails}
        />
      </PokemonListContextProvider>
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

  const pokedexLimit = await getPokedexLimit();
  const generations = await getGenerations();
  const pokemonTypes = await getPokemonTypes();
  const staticData = {
    pokedexLimit,
    generations,
    pokemonTypes,
  };

  const pokemonDetails = { ...pokemonForms };
  const defaultPokemonForm = pokemonForms.forms.find(form => form.isDefault);
  const AlternativePokemonForms = pokemonForms.forms.filter(
    form => !form.isDefault,
  );

  return {
    props: {
      pokemonDetails,
      AlternativePokemonForms,
      defaultPokemonForm,
      staticData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
