import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import getPokemonDetailsData from '@utils/getPokemonDetailsData';
import { useState } from 'react';
import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';
import styles from './styles.module.scss';

interface IPokemonDetailsProps {
  pokemon: IPokemonDetails;
}

const Pokemon = ({ pokemon }: IPokemonDetailsProps): JSX.Element => {
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  function handleDescriptionChange(index: number): void {
    setDescriptionIndex(index);
  }

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
              <div className={styles.basicInfo}>
                {pokemon.id <= 10 ? (
                  <span className={styles.number}># 0{pokemon.id}</span>
                ) : (
                  <span className={styles.number}># {pokemon.id}</span>
                )}
                <div className={styles.typeContainer}>
                  {pokemon.types.map((type, index) => (
                    <span
                      key={type}
                      title={type}
                      className={`${styles.type} ${
                        styles[pokemon.types[index]]
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.descriptionContainer}>
                <ul className={styles.generationDescriptionContainer}>
                  {pokemon.descriptions.map((item, index) => {
                    return (
                      <li key={item.gameVersion}>
                        <button
                          type="button"
                          className={`${styles.generationDescriptionOption} ${
                            descriptionIndex === index && styles.active
                          }`}
                          onClick={() => handleDescriptionChange(index)}
                        >
                          {transformNumberToRomanNumeral(index + 1)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className={styles.description}>
                  {pokemon.descriptions[descriptionIndex].description}
                  {(descriptionIndex === 3 || descriptionIndex === 4) && (
                    <small className={styles.sideNote}>
                      Sidenote: The fourth and fifth generation share some
                      descriptions
                    </small>
                  )}
                </p>
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
  const pokemonIdAsNumber = parseInt(id as string, 10);
  const pokemon = await getPokemonDetailsData(pokemonIdAsNumber);

  return {
    props: {
      pokemon,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
