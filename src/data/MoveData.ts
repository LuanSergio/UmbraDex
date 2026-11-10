import { Either, right, left } from '@core/Either';

import MoveRepository from '@domain/repository/MoveRepository';
import Move from '@domain/entities/Move';
import { GetByPokemonIdResponse } from '@data/responses/MoveResponses';

import IHttpClient from '@services/http/IHttpClient';

interface GetByPokemonIdParams {
  pokemonId: number;
  groupVersionId: number;
  queryName: string;
  page: number;
  perRequest: number;
}

export default class MoveData implements MoveRepository {
  private readonly getAllQuery = (
    id: number,
    groupVersionId: number,
    page: number,
    perRequest: number,
    queryName,
  ) => {
    const offset = page * perRequest;

    return `query ${queryName} {
      moves: pokemonmove(where: {pokemon_id: {_eq: ${id}}}  distinct_on: [move_id], limit: ${perRequest}, offset: ${offset}) {
        move: move {
          name
          power
          pp
          damageClass: movedamageclass {
            name
          }
          type: type {
            name
          }
          accuracy
        }
      }
    }`;
  };

  constructor(private readonly client: IHttpClient) {}

  async getByPokemonId({
    pokemonId,
    groupVersionId,
    page,
    perRequest,
    queryName,
  }: GetByPokemonIdParams): Promise<Either<Error, Move[]>> {
    try {
      const result = await this.client.request<GetByPokemonIdResponse>({
        query: this.getAllQuery(
          pokemonId,
          groupVersionId,
          page,
          perRequest,
          queryName,
        ),
      });

      const moves = result.body.moves.map(item => {
        const { move } = item;

        return {
          name: move.name,
          power: move.power,
          pp: move.pp,
          accuracy: move.accuracy,
          category: move.damageClass.name,
          type: move.type.name,
        };
      });

      return right(moves);
    } catch (error) {
      return left(error);
    }
  }
}
