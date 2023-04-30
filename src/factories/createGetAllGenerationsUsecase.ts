import GraphqlClient from '@infra/GraphqlClient';
import GenerationData from '@data/GenerationData';
import GetGenerationsUsecase from '@domain/usecases/GetGenerationsUsecase';

const createGetAllGenerationsUsecase = () => {
  const httpClient = new GraphqlClient();
  const generationsRepository = new GenerationData(httpClient);

  return new GetGenerationsUsecase(generationsRepository);
};

export default createGetAllGenerationsUsecase;
