import GraphqlClient from '@infra/GraphqlClient';
import Generations from '@data/generations';
import GetGenerationsUsecase from '@domain/usecases/GetGenerationsUsecase';

const createGetAllGenerationsUsecase = () => {
  const httpClient = new GraphqlClient();
  const generationsRepository = new Generations(httpClient);

  return new GetGenerationsUsecase(generationsRepository);
};

export default createGetAllGenerationsUsecase;
