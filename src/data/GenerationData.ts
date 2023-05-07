import { Either, right, left } from '@core/Either';

import GenerationRepository from '@domain/repository/GenerationRepository';
import Generation from '@domain/entities/Generation';
import IHttpClient from '@services/http/IHttpClient';

interface IGetAllResponse {
  generations: Generation[];
}

export default class GenerationData implements GenerationRepository {
  private readonly getAllQuery = `
  query PokemonGeneration {
    generations: pokemon_v2_generation {
      id
      name
    }
  }`;

  constructor(private readonly client: IHttpClient) {}

  async getAll(): Promise<Either<Error, Generation[]>> {
    try {
      const result = await this.client.request<IGetAllResponse>({
        query: this.getAllQuery,
      });

      return right(result.body.generations);
    } catch (error) {
      return left(error);
    }
  }
}
