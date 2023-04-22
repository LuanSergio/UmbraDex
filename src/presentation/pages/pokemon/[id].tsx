import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import getPokemonDetailsData from 'src/presentation/requests/getPokemonDetailsData';
import getPokedexLimit from 'src/presentation/requests/getPokedexLimit';
import getPokemonTypes from 'src/presentation/requests/getPokemonTypes';

import Generation from '@domain/entities/Generation';
import createGetAllGenerationsUsecase from '@factories/createGetAllGenerationsUsecase';

import PokemonContent from '@components/PokemonContent';
import Header from '@components/Header';
import { PokemonListContextProvider } from '@contexts/PokemonListContext';

interface IPokemonDetailsProps {
  pokemonDetails: IPokemonDetails;
  defaultPokemonForm: IPokemonForm;
  AlternativePokemonForms: IPokemonForm[];
  staticData: {
    pokedexLimit: number;
    generations: Generation[];
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
        <Header />
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

  const getGenerationUsecase = createGetAllGenerationsUsecase();
  const generationsResponse = await getGenerationUsecase.getAll();

  let generations: Generation[] = [];

  if (generationsResponse.isRight()) {
    generations = generationsResponse.value;
  }

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
