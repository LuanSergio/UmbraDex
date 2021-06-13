import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from 'src/services/api';
import Header from '@components/molecules/Header';

interface IPokemonDetails {
  name: string;
  id: number;
  types: string[];
  image: string;
}

interface ISpeciesDetail {
  description: string;
  originalName: string;
}

interface IPokemonDetailsProps {
  pokemon: IPokemonDetails;
  speciesDetail: ISpeciesDetail;
}

const Pokemon = ({
  pokemon,
  speciesDetail,
}: IPokemonDetailsProps): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <img src={pokemon.image} alt={pokemon.name} />
        <span>{pokemon.id}</span>
        <span>{speciesDetail.originalName}</span>

        <h1>{pokemon?.name}</h1>
        <p>{speciesDetail.description}</p>
      </main>
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

  const { data: pokemonData } = await api.get(`pokemon/${id}/`);

  const { data: speciesData } = await api.get(`pokemon-species/${id}/`);

  const pokemon = {
    name: pokemonData.name,
    id: pokemonData.id,
    types: pokemonData.types.map(item => item.type.name),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
  };

  const speciesDetail = {
    description: speciesData.flavor_text_entries[0].flavor_text,
    originalName: speciesData.names[0].name,
  };

  return {
    props: {
      pokemon,
      speciesDetail,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
