import GraphqlClient from '@infra/GraphqlClient';
import PokemonTypeData from '@data/PokemonTypeData';
import GetPokemonTypeEfficaciesUsecase from '@domain/usecases/GetPokemonTypeEfficaciesUsecase';

const createGetPokemonTypeEfficaciesUsecase = () => {
  const httpClient = new GraphqlClient();
  const typeRepository = new PokemonTypeData(httpClient);

  return new GetPokemonTypeEfficaciesUsecase(typeRepository);
};

export default createGetPokemonTypeEfficaciesUsecase;
