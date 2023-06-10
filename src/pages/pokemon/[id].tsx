import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import createGetAllGenerationsUsecase from 'src/factories/createGetAllGenerationsUsecase';
import createGetPokedexLimitUsecase from 'src/factories/createGetPokedexLimitUsecase';
import createGetPokemonByIdUsecase from 'src/factories/createGetPokemonByIdUsecase';
import createGetPokemonTypeUsecase from '@factories/createGetPokemonTypeUsecase';

import Generation from '@domain/entities/Generation';
import Pokemon from '@domain/entities/Pokemon';
import PokemonType from '@domain/entities/PokemonType';
import PokemonForm from '@domain/entities/PokemonForm';

import PokemonContent from '@components/PokemonContent';
import Header from '@components/Header';
import { PokemonListContextProvider } from 'src/contexts/PokemonListContext';

interface PokemonDetailsProps {
  pokemonDetails: Pokemon;
  defaultPokemonForm: PokemonForm;
  AlternativePokemonForms: PokemonForm[];
  staticData: {
    pokedexLimit: number;
    generations: Generation[];
    pokemonTypes: PokemonType[];
  };
}

const PokemonPage = ({
  defaultPokemonForm,
  AlternativePokemonForms,
  pokemonDetails,
  staticData,
}: PokemonDetailsProps): JSX.Element => {
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

  const getGenerationUsecase = createGetAllGenerationsUsecase();
  const getPokedexLimitUsecase = createGetPokedexLimitUsecase();
  const getPokemonByIdUsecase = createGetPokemonByIdUsecase();
  const getPokemonTypesUsecase = createGetPokemonTypeUsecase();

  const pokemonByIdResponse = await getPokemonByIdUsecase.getById(
    pokemonIdAsNumber,
  );
  const generationsResponse = await getGenerationUsecase.getAll();
  const pokedexLimitResponse = await getPokedexLimitUsecase.getLimit();

  const pokemonTypesResponse = await getPokemonTypesUsecase.getAll();

  let pokemonForms: Pokemon;
  let generations: Generation[] = [];
  let pokedexLimit = 1008;
  let pokemonTypes: PokemonType[] = [];

  if (pokemonByIdResponse.isRight()) {
    pokemonForms = pokemonByIdResponse.value;
  }

  if (generationsResponse.isRight()) {
    generations = generationsResponse.value;
  }

  if (pokedexLimitResponse.isRight()) {
    pokedexLimit = pokedexLimitResponse.value;
  }

  if (pokemonTypesResponse.isRight()) {
    pokemonTypes = pokemonTypesResponse.value;
  }

  const staticData = {
    pokedexLimit,
    generations,
    pokemonTypes,
  };

  const pokemonDetails = { ...pokemonForms };
  const defaultPokemonForm = pokemonForms?.forms.find(form => form.isDefault);
  const AlternativePokemonForms = pokemonForms?.forms.filter(
    form => !form.isDefault,
  );

  return {
    props: {
      pokemonDetails,
      AlternativePokemonForms: AlternativePokemonForms ?? [],
      defaultPokemonForm: defaultPokemonForm ?? [],
      staticData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default PokemonPage;
