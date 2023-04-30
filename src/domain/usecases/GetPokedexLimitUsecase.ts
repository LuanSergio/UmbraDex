import PokedexRepository from '@domain/repository/PokedexRepository';
import { Either } from '@core/Either';

class GetPokedexLimitUsecase {
  constructor(private readonly pokedexRepository: PokedexRepository) {}

  async getLimit(): Promise<Either<Error, number>> {
    return this.pokedexRepository.getLimit();
  }
}

export default GetPokedexLimitUsecase;
