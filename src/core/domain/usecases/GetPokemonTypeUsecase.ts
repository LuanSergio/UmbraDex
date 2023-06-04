import { Either } from '@core/Either';

import PokemonTypesRepository from '@domain/repository/PokemonTypesRepository';
import PokemonType from '@domain/entities/PokemonType';

class GetPokemonTypeEfficaciesUsecase {
  constructor(private readonly pokemonRepository: PokemonTypesRepository) {}

  async getAll(): Promise<Either<Error, PokemonType[]>> {
    return this.pokemonRepository.getAll();
  }
}

export default GetPokemonTypeEfficaciesUsecase;
