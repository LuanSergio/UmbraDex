import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from 'src/services/api';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';
import Head from 'next/head';
import {
  pokemonArtworkImages,
  pokemonArtworkUploadedQuantity,
} from '@data/imagesRoutes';
import DefaultLayout from '@components/layouts/DefaultLayout';
import styles from './styles.module.scss';

interface IPokemonDetails {
  name: string;
  id: number;
  types: string[];
  image: string;
  description: string;
  originalName: string;
}

interface IPokemonDetailsProps {
  pokemon: IPokemonDetails;
}

interface IPokemonDescription {
  flavorText: string;
  version: string;
}

const Pokemon = ({ pokemon }: IPokemonDetailsProps): JSX.Element => {
  return (
    <>
      <Head>
        <title key="title">UmbraDex | {pokemon.name}</title>
      </Head>
      <div className={`${styles.content} ${styles[pokemon.types[0]]}`}>
        <DefaultLayout>
          {/* <button type="button">Last</button> */}
          <div className={styles.container}>
            <div className={styles.pokemonContainer}>
              <span className={styles.originalName}>
                {pokemon.originalName}
              </span>
              <img
                className={styles.pokemon}
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
            <div className={styles.informationContainer}>
              <h1 className={styles.name}>{pokemon?.name}</h1>
              {pokemon.id <= 10 ? (
                <span className={styles.number}># 0{pokemon.id}</span>
              ) : (
                <span className={styles.number}># {pokemon.id}</span>
              )}
              <div className={styles.descriptionContainer}>
                <ul className={styles.generationDescriptionContainer}>
                  <li>
                    <button
                      type="button"
                      className={`${styles.generationDescriptionOption} ${styles.active}`}
                    >
                      I
                    </button>
                    <button
                      type="button"
                      className={styles.generationDescriptionOption}
                    >
                      II
                    </button>
                    <button
                      type="button"
                      className={styles.generationDescriptionOption}
                    >
                      III
                    </button>
                    <button
                      type="button"
                      className={styles.generationDescriptionOption}
                    >
                      IV
                    </button>
                  </li>
                </ul>
                <p className={styles.description}>{pokemon.description}</p>
              </div>
            </div>
          </div>
          {/* <button type="button">Next</button> */}
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
  const { data: pokemonData } = await api.get(`pokemon/${id}/`);
  const { data: speciesData } = await api.get(`pokemon-species/${id}/`);

  function formatPokemonDescription(description) {
    return {
      flavorText: description.flavor_text
        .replace('\f', ' ')
        .replace('POKéMON', 'Pokémon'),
      version: description.version.name,
    };
  }

  function filterDescriptionsByLanguage(
    language: string,
  ): IPokemonDescription[] {
    const descriptions = speciesData.flavor_text_entries.filter(
      description => description.language.name === language,
    );

    return descriptions.map(description =>
      formatPokemonDescription(description),
    );
  }

  const pokemon = {
    name: transformFirstLetterToUppercase(pokemonData.name),
    id: pokemonData.id,
    types: pokemonData.types.map(item => item.type.name),
    image:
      pokemonArtworkUploadedQuantity >= pokemonData.id
        ? `${pokemonArtworkImages.main}/${pokemonData.id}.png`
        : `${pokemonArtworkImages.fallback}/${pokemonData.id}.png`,
    description: filterDescriptionsByLanguage('en')[0].flavorText,
    originalName: speciesData.names[0].name,
  };

  return {
    props: {
      pokemon,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
