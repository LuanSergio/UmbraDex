import { Either } from '@core/Either';

export default interface PokedexRepository {
  getAll: () => Promise<Either<Error, number>>;
}
