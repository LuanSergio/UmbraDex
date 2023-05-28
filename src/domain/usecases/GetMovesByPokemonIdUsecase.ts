import { Either } from '@core/Either';

import Move from '@domain/entities/Move';
import MoveRepository from '@domain/repository/MoveRepository';

interface GetByPokemonIdParams {
  pokemonId: number;
  groupVersionId: number;
}

class GetMovesByPokemonIdUsecase {
  constructor(private readonly moveRepository: MoveRepository) {}

  async getByPokemonId({
    pokemonId,
    groupVersionId,
  }: GetByPokemonIdParams): Promise<Either<Error, Move[]>> {
    return this.moveRepository.getByPokemonId({ pokemonId, groupVersionId });
  }
}

export default GetMovesByPokemonIdUsecase;
