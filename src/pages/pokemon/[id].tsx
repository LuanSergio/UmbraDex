import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PokemonContent from '@components/organism/PokemonContent';

import getPokemonDetailsData from '@requests/getPokemonDetailsData';

interface IPokemonDetailsProps {
  pokemonDetails: IPokemonDetails;
  defaultPokemonForm: IPokemonForm;
  AlternativePokemonForms: IPokemonForm[];
  pokedexLimit: number;
}

const Pokemon = ({
  defaultPokemonForm,
  AlternativePokemonForms,
  pokedexLimit,
  pokemonDetails,
}: IPokemonDetailsProps): JSX.Element => {
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    sessionStorage.setItem('currentPokemonId', id as string);
  }, [id]);

  return (
    <>
      <Head>
        <title key="title">{defaultPokemonForm.name} | UmbraDex</title>
      </Head>

      <PokemonContent
        AlternativePokemonForms={AlternativePokemonForms}
        defaultPokemonForm={defaultPokemonForm}
        pokedexLimit={pokedexLimit}
        pokemonDetails={pokemonDetails}
      />
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
