import { Either } from '@core/Either';

export default interface PokedexRepository {
  getLimit: () => Promise<Either<Error, number>>;
}
