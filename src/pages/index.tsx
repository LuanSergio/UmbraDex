// eslint-disable-next-line camelcase
import { unstable_serialize } from 'swr';
import { useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Script from 'next/script';

import DefaultLayout from '@components/layouts/DefaultLayout';
import PokemonCardList from '@components/organism/PokemonCardList';
import getPokemonListData from '@requests/getPokemonListData';
import { PokemonListContextProvider } from '@contexts/PokemonListContext';
import { ThemeContextProvider } from '@contexts/ThemeContext';
import bodyDefaultClasses from '@data/bodyDefaultClasses';
import getPokedexLimit from '@requests/getPokedexLimit';

const Home = ({ fallback, pokedexLimit }): JSX.Element => {
  function getPokemonFallbackList(): IBasicPokemonInfo[][] {
    return Object.values(fallback)[0] as IBasicPokemonInfo[][];
  }

  useEffect(() => {
    document.body.className = `initial ${bodyDefaultClasses}`;
  }, []);

  return (
    <div>
      <Script strategy="afterInteractive">
        {`
          function getInitialThemeScheme() {
            const persistedColorPreference = window.localStorage.getItem("color-mode");
            const hasPersistedPreference = typeof persistedColorPreference === "string";

            if (hasPersistedPreference) {
              return persistedColorPreference;
            }

          const mediaQueryPreference = window.matchMedia(
              "(prefers-color-scheme: dark)"
            );
            const hasMediaQueryPreference =
              typeof mediaQueryPreference.matches === "boolean";

            if (hasMediaQueryPreference) {
              return mediaQueryPreference.matches ? "dark" : "light";
            }

            return "light";
          }

          document.documentElement.style.setProperty(
            "--color-background",
            getInitialThemeScheme() === "light" ? "#fbfbfb" : "#161b3f"
          );
        `}
      </Script>

      <Head>
        <title>UmbraDex</title>
      </Head>
      <ThemeContextProvider>
        <PokemonListContextProvider
          fallback={getPokemonFallbackList()}
          pokedexLimit={pokedexLimit}
        >
          <DefaultLayout>
            <PokemonCardList />
          </DefaultLayout>
        </PokemonListContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryName = 'pokemonList';
  const pokedexLimit = await getPokedexLimit();

  const pokemonList = await getPokemonListData({
    queryName,
    page: 0,
    search: '',
  });

  return {
    props: {
      fallback: {
        [unstable_serialize([queryName, 1])]: [pokemonList],
      },
      pokedexLimit,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
