import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from 'src/services/api';
import Header from '@components/molecules/Header';
import styles from './styles.module.scss';

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
      <main className={`container ${styles.container}`}>
        <div className={styles.pokemonContainer}>
          <span className={styles.number}>#{pokemon.id}</span>
          <span className={styles.originalName}>
            {speciesDetail.originalName}
          </span>
          <img
            className={styles.pokemon}
            src={pokemon.image}
            alt={pokemon.name}
          />
        </div>
        <div className={styles.informationContainer}>
          <h1 className={styles.name}>{pokemon?.name}</h1>
          <p className={styles.description}>{speciesDetail.description}</p>
        </div>
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