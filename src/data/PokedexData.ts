import { Either, right, left } from '@core/Either';
import PokedexRepository from '@domain/repository/PokedexRepository';
import { GetPokedexLimitResponse } from '@data/responses/PokedexResponse';

import IHttpClient from '@services/http/IHttpClient';

export default class PokedexData implements PokedexRepository {
  private readonly getLimitQuery = `
  query Pokedex {
    pokedex: pokemon_v2_pokedex(where: {name: {_eq: "national"}}) {
      pokedexNumbers: pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: desc}, limit: 1) {
        limit: pokedex_number
      }
    }
  }  
`;

  constructor(private readonly client: IHttpClient) {}

  async getLimit(): Promise<Either<Error, number>> {
    try {
      const result = await this.client.request<GetPokedexLimitResponse>({
        query: this.getLimitQuery,
      });

      return right(result.body.pokedex[0].pokedexNumbers[0].limit);
    } catch (error) {
      return left(error);
    }
  }
}
