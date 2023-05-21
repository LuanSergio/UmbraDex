import { Either } from '@core/Either';

import Move from '@domain/entities/Move';
import MoveRepository from '@domain/repository/MoveRepository';

class GetMovesByPokemonIdUsecase {
  constructor(private readonly moveRepository: MoveRepository) {}

  async getByPokemonId(pokemonId: number): Promise<Either<Error, Move[]>> {
    return this.moveRepository.getByPokemonId(pokemonId);
  }
}

export default GetMovesByPokemonIdUsecase;
