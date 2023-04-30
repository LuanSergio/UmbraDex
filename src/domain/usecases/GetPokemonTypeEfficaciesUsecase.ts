import { Either } from '@core/Either';

import PokemonTypesRepository from '@domain/repository/PokemonTypesRepository';
import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';

class GetPokemonTypeEfficaciesUsecase {
  constructor(private readonly pokemonRepository: PokemonTypesRepository) {}

  async getTypeEfficacies(
    typesId: number[],
  ): Promise<Either<Error, PokemonTypeEfficiency>> {
    return this.pokemonRepository.getPokemonTypeEfficacies(typesId);
  }
}

export default GetPokemonTypeEfficaciesUsecase;
