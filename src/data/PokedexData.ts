import { Either, right, left } from '@core/Either';
import PokedexRepository from '@domain/repository/PokedexRepository';
import IHttpClient from '@services/http/IHttpClient';

interface GetLimitResponse {
  pokedex: {
    pokedexNumbers: {
      limit: number;
    };
  };
}

export default class PokedexData implements PokedexRepository {
  private readonly getLimitQuery = `
  query PokemonDetails {
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
      const result = await this.client.request<GetLimitResponse>({
        query: this.getLimitQuery,
      });

      return right(result.body.pokedex.pokedexNumbers.limit);
    } catch (error) {
      return left(error);
    }
  }
}