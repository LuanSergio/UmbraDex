import GraphqlClient from '@infra/GraphqlClient';
import PokemonTypeData from '@data/PokemonTypeData';
import GetPokemonTypeUsecase from '@domain/usecases/GetPokemonTypeUsecase';

const createGetPokemonTypeUsecase = () => {
  const httpClient = new GraphqlClient();
  const typeRepository = new PokemonTypeData(httpClient);

  return new GetPokemonTypeUsecase(typeRepository);
};

export default createGetPokemonTypeUsecase;
