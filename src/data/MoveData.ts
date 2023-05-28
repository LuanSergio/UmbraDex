import { Either, right, left } from '@core/Either';

import MoveRepository from '@domain/repository/MoveRepository';
import Move from '@domain/entities/Move';
import { GetByPokemonIdResponse } from '@data/responses/MoveResponses';

import IHttpClient from '@services/http/IHttpClient';

interface GetByPokemonIdParams {
  pokemonId: number;
  groupVersionId: number;
}

export default class MoveData implements MoveRepository {
  private readonly getAllQuery = (id: number, groupVersionId: number) =>
    `query PokemonMove {
      moves: pokemon_v2_pokemonmove(where: {pokemon_id: {_eq: ${id}}, version_group_id: {_eq: ${groupVersionId}}}) {
        move: pokemon_v2_move {
          name
          power
          pp
          damageClass: pokemon_v2_movedamageclass {
            name
          }
          type: pokemon_v2_type {
            name
          }
          accuracy
        }
      }
    }`;

  constructor(private readonly client: IHttpClient) {}

  async getByPokemonId({
    pokemonId,
    groupVersionId,
  }: GetByPokemonIdParams): Promise<Either<Error, Move[]>> {
    try {
      const result = await this.client.request<GetByPokemonIdResponse>({
        query: this.getAllQuery(pokemonId, groupVersionId),
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
