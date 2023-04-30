import GraphqlClient from '@infra/GraphqlClient';
import PokemonData from '@data/PokemonData';
import GetPokemonByIdUsecase from '@domain/usecases/GetPokemonByIdUsecase';

const createGetPokemonByIdUsecase = () => {
  const httpClient = new GraphqlClient();
  const pokemonRepository = new PokemonData(httpClient);

  return new GetPokemonByIdUsecase(pokemonRepository);
};

export default createGetPokemonByIdUsecase;
