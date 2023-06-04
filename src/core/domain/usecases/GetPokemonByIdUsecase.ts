import { Either } from '@core/Either';

import PokemonRepository from '@domain/repository/PokemonRepository';
import Pokemon from '@domain/entities/Pokemon';

class GetPokemonByIdUsecase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async getById(id: number): Promise<Either<Error, Pokemon>> {
    return this.pokemonRepository.getById(id);
  }
}

export default GetPokemonByIdUsecase;
