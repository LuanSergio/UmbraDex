import Generation from '@domain/entities/Generation';
import { Either } from '@core/Either';

export default interface GenerationRepository {
  getAll: () => Promise<Either<Error, Generation[]>>;
}
