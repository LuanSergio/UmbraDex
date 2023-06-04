import { Either } from '@core/Either';
import Generation from '@domain/entities/Generation';

export default interface GenerationRepository {
  getAll: () => Promise<Either<Error, Generation[]>>;
}
