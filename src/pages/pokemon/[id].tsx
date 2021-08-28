import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import DefaultLayout from '@components/layouts/DefaultLayout';
import getPokemonDetailsData from '@utils/getPokemonDetailsData';
import { useState } from 'react';
import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';
import NextLink from 'next/link';
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
          <div className={styles.navigation}>
            <NextLink href={`/pokemon/${pageId - 1}`}>
              <button
                type="button"
                disabled={pageId <= 1}
                aria-label="Previous pokemon"
                title="Previous pokemon"
                className={styles.previous}
              />
            </NextLink>
            <NextLink href={`/pokemon/${pageId + 1}`}>
              <button
                type="button"
                disabled={pageId >= pokedexLimit}
                aria-label="Next pokemon"
                title="Next pokemon"
                className={styles.next}
              />
            </NextLink>
          </div>
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
