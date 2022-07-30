import getPokemonListData from '@requests/getPokemonListData';
import useSWR from 'swr';

interface IUsePokemonListReponse {
  pokemonList: IBasicPokemonInfo[];
  isLoading: boolean;
}

export default function usePokemonList(): IUsePokemonListReponse {
  const { data, error } = useSWR('pokemon-list', getPokemonListData);
  console.log('has fetched');
  return {
    pokemonList: data,
    isLoading: !error && !data,
  };
}
