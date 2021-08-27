import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import getPokemonDetailsData from '@utils/getPokemonDetailsData';
import { useState } from 'react';
import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';
import styles from './styles.module.scss';

interface IPokemonDetailsProps {
  pokemon: IPokemonDetails;
  variants: IPokemonVariantDetails;
}

const Pokemon = ({ pokemon, variants }: IPokemonDetailsProps): JSX.Element => {
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  function handleDescriptionChange(index: number): void {
    setDescriptionIndex(index);
  }

  return (
    <>
      <Head>
        <title key="title">UmbraDex | {pokemon.forms.name}</title>
      </Head>
      <div className={`${styles.content} ${styles[pokemon.forms.types[0]]}`}>
        <DefaultLayout>
          {/* <button type="button">Last</button> */}
          <div className={styles.container}>
            <div className={styles.pokemonContainer}>
              <span className={styles.japaneseName}>
                {pokemon.japaneseName}
              </span>
              <img
                className={styles.pokemon}
                src={pokemon.forms.image}
                alt={pokemon.forms.name}
              />
            </div>
            <div className={styles.informationContainer}>
              <h1 className={styles.name}>{pokemon.forms.name}</h1>
              <div className={styles.basicInfo}>
                {pokemon.forms.id <= 10 ? (
                  <span className={styles.number}># 0{pokemon.forms.id}</span>
                ) : (
                  <span className={styles.number}># {pokemon.forms.id}</span>
                )}
                <div className={styles.typeContainer}>
                  {pokemon.forms.types.map((type, index) => (
                    <span
                      key={type}
                      title={type}
                      className={`${styles.type} ${
                        styles[pokemon.forms.types[index]]
                      } ${
                        pokemon.forms.types.length > 1
                          ? styles.dualType
                          : styles.singleType
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
                      <li key={`${item.id}`}>
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
  const pokemonForms = await getPokemonDetailsData(pokemonIdAsNumber);
  const pokemon = {
    ...pokemonForms,
    forms: pokemonForms.forms.find(form => form.isDefault),
  };

  const variants = {
    ...pokemonForms,
    forms: pokemonForms.forms.filter(form => !form.isDefault),
  };

  return {
    props: {
      pokemon,
      variants,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Pokemon;
