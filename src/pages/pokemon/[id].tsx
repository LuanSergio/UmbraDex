import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from 'src/services/api';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';
import Header from '@components/molecules/Header';
import Head from 'next/head';
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

interface IPokemonDescription {
  flavorText: string;
  version: string;
}

const Pokemon = ({
  pokemon,
  speciesDetail,
}: IPokemonDetailsProps): JSX.Element => {
  return (
    <>
      <Head>
        <title key="title">UmbraDex | {pokemon.name}</title>
      </Head>
      <Header />
      <main className={`container ${styles.container}`}>
        <div className={styles.pokemonContainer}>
          {/* <span className={styles.number}>#{pokemon.id}</span> */}
          {pokemon.id <= 10 ? (
            <span className={styles.number}># 0{pokemon.id}</span>
          ) : (
            <span className={styles.number}># {pokemon.id}</span>
          )}
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
    name: transformFirstLetterToUppercase(pokemonData.name),
    id: pokemonData.id,
    types: pokemonData.types.map(item => item.type.name),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
  };

  const formatPokemonDescription = description => {
    return {
      flavorText: description.flavor_text.replace('\f', ' '),
      version: description.version.name,
    };
  };

  const filterDescriptionsByLanguage = (
    language: string,
  ): IPokemonDescription[] => {
    const descriptions = speciesData.flavor_text_entries.filter(
      description => description.language.name === language,
    );

    return descriptions.map(description =>
      formatPokemonDescription(description),
    );
  };

  const speciesDetail = {
    description: filterDescriptionsByLanguage('en')[0].flavorText,
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
