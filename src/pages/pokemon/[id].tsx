import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import PokemonContent from '@components/organism/PokemonContent';

import getPokemonDetailsData from '@utils/getPokemonDetailsData';
import { useEffect } from 'react';

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
  useEffect(() => {
    console.log('pokemon', pokemonDetails);
  }, [pokemonDetails]);

  return (
    <>
      <Head>
        <title key="title">UmbraDex | {defaultPokemonForm.name}</title>
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
