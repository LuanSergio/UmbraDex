import GraphqlClient from '@infra/GraphqlClient';
import MoveData from '@data/MoveData';
import GetMovesByPokemonIdUsecase from '@domain/usecases/GetMovesByPokemonIdUsecase';

const createGetMovesByPokemonIdUsecase = () => {
  const httpClient = new GraphqlClient();
  const moveRepository = new MoveData(httpClient);

  return new GetMovesByPokemonIdUsecase(moveRepository);
};

export default createGetMovesByPokemonIdUsecase;
