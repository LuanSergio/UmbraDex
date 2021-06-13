import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from 'src/services/api';

interface IPokemonDetails {
  name: string;
}

interface IPokemonDetailsProps {
  pokemon: IPokemonDetails;
}

const Pokemon = ({ pokemon }: IPokemonDetailsProps): JSX.Element => {
  return (
    <>
      <h1>{pokemon?.name}</h1>
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
  const { name } = context.params;

  const { data } = await api.get(`pokemon/${name}/`);

  const pokemon = {
    name: data.name,
  };

  return {
    props: {
      pokemon,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
