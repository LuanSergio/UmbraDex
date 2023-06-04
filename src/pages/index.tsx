// eslint-disable-next-line camelcase
import { unstable_serialize } from 'swr';
import { useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import createGetAllGenerationsUsecase from '@factories/createGetAllGenerationsUsecase';
import createGetPokedexLimitUsecase from '@factories/createGetPokedexLimitUsecase';
import createGetPokemonListUsecase from '@factories/createGetPokemonListUsecase';
import createGetPokemonTypeUsecase from '@factories/createGetPokemonTypeUsecase';

import Generation from '@domain/entities/Generation';
import PokemonType from '@domain/entities/PokemonType';

import DefaultLayout from 'src/layouts/DefaultLayout';
import PokemonCardList from '@components/PokemonCardList';
import { PokemonListContextProvider } from 'src/contexts/PokemonListContext';
import bodyDefaultClasses from 'src/constants/bodyDefaultClasses';
import POKEMON_PER_REQUEST from 'src/constants/pokemonPerRequest';
import PokemonSummary from '@domain/entities/PokemonSummary';

const Home = ({ fallback, staticData }): JSX.Element => {
  function getPokemonFallbackList(): PokemonSummary[][] {
    return Object.values(fallback)[0] as PokemonSummary[][];
  }

  useEffect(() => {
    document.body.className = `initial ${bodyDefaultClasses}`;
  }, []);

  return (
    <div>
      <Head>
        <title>UmbraDex</title>
      </Head>
      <PokemonListContextProvider
        fallback={getPokemonFallbackList()}
        staticData={staticData}
      >
        <DefaultLayout>
          <PokemonCardList />
        </DefaultLayout>
      </PokemonListContextProvider>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryName = 'pokemonList';
  const getPokemonListUsecase = createGetPokemonListUsecase();
  const getGenerationUsecase = createGetAllGenerationsUsecase();
  const getPokedexLimitUsecase = createGetPokedexLimitUsecase();
  const getPokemonTypeUsecase = createGetPokemonTypeUsecase();

  const pokemonListResponse = await getPokemonListUsecase.getAll({
    queryName,
    page: 0,
    search: '',
    pokemonPerRequest: POKEMON_PER_REQUEST,
  });
  const generationsResponse = await getGenerationUsecase.getAll();
  const pokedexLimitResponse = await getPokedexLimitUsecase.getLimit();
  const pokemonTypesResponse = await getPokemonTypeUsecase.getAll();

  let pokemonList: PokemonSummary[] = [];
  let generations: Generation[] = [];
  let pokedexLimit = 151;
  let pokemonTypes: PokemonType[] = [];

  if (pokemonListResponse.isRight()) {
    pokemonList = pokemonListResponse.value;
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

  return {
    props: {
      fallback: {
        [unstable_serialize([queryName, 1])]: [pokemonList],
      },
      staticData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
