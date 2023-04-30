import GraphqlClient from '@infra/GraphqlClient';
import PokemonData from '@data/PokemonData';
import GetPokemonListUsecase from '@domain/usecases/GetPokemonListUsecase';

const createGetPokemonListUsecase = () => {
  const httpClient = new GraphqlClient();
  const pokemonRepository = new PokemonData(httpClient);

  return new GetPokemonListUsecase(pokemonRepository);
};

export default createGetPokemonListUsecase;
