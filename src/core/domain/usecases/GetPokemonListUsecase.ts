import { Either } from '@core/Either';

import PokemonRepository, {
  GetAllParams,
} from '@domain/repository/PokemonRepository';
import PokemonSummary from '@domain/entities/PokemonSummary';

class GetPokemonListUsecase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async getAll(params: GetAllParams): Promise<Either<Error, PokemonSummary[]>> {
    return this.pokemonRepository.getAll(params);
  }
}

export default GetPokemonListUsecase;
