import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import LinearNavigation from '@components/molecules/LinearNavigation';
import PokemonHighlight from '@components/molecules/PokemonHighlight';
import PokemonBasicInformation from '@components/molecules/PokemonBasicInformation';
import getPokemonDetailsData from '@utils/getPokemonDetailsData';

import { useRouter } from 'next/router';
import styles from './styles.module.scss';

interface IPokemonDetailsProps {
  pokemon: IPokemonDetails;
  pokedexLimit: number;
}

const Pokemon = ({
  pokemon,
  pokedexLimit,
}: IPokemonDetailsProps): JSX.Element => {
  const router = useRouter();
  const pageId = parseInt(router.query.id as string, 10);

  return (
    <>
      <Head>
        <title key="title">UmbraDex | {pokemon.forms.name}</title>
      </Head>
      <div className={`${styles.content} ${styles[pokemon.forms.types[0]]}`}>
        <DefaultLayout>
          <div className={styles.container}>
            <PokemonHighlight
              japaneseName={pokemon.japaneseName}
              image={pokemon.forms.image}
              name={pokemon.forms.name}
            />
            <PokemonBasicInformation
              name={pokemon.forms.name}
              pokedexIndex={pokemon.forms.id}
              types={pokemon.forms.types}
              descriptions={pokemon.descriptions}
            />
          </div>
          <LinearNavigation
            previous={`/pokemon/${pageId - 1}`}
            next={`/pokemon/${pageId + 1}`}
            disablePrevious={pageId <= 1}
            disableNext={pageId >= pokedexLimit}
          />
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
  const pokemon = {
    ...pokemonForms,
    forms: pokemonForms.forms.find(form => form.isDefault),
  };

  const variants = {
    ...pokemonForms,
    forms: pokemonForms.forms.filter(form => !form.isDefault),
  };

  const { pokedexLimit } = pokemonForms;

  return {
    props: {
      pokemon,
      variants,
      pokedexLimit,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
