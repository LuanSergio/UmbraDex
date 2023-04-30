import GraphqlClient from '@infra/GraphqlClient';
import PokedexData from '@data/PokedexData';
import GetPokedexLimitUsecase from '@domain/usecases/GetPokedexLimitUsecase';

const createGetPokedexLimitUsecase = () => {
  const httpClient = new GraphqlClient();
  const pokedexRepository = new PokedexData(httpClient);

  return new GetPokedexLimitUsecase(pokedexRepository);
};

export default createGetPokedexLimitUsecase;
