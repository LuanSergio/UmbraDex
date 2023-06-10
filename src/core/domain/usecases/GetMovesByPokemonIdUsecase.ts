import { Either } from '@core/Either';

import Move from '@domain/entities/Move';
import MoveRepository from '@domain/repository/MoveRepository';

interface GetByPokemonIdParams {
  pokemonId: number;
  queryName: string;
  page: number;
  perRequest: number;
}

class GetMovesByPokemonIdUsecase {
  constructor(private readonly moveRepository: MoveRepository) {}

  async getByPokemonId({
    pokemonId,
    page,
    perRequest,
    queryName,
  }: GetByPokemonIdParams): Promise<Either<Error, Move[]>> {
    return this.moveRepository.getByPokemonId({
      pokemonId,
      page,
      perRequest,
      queryName,
    });
  }
}

export default GetMovesByPokemonIdUsecase;
