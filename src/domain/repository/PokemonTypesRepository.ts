import PokemonType from '@domain/entities/PokemonType';
import { Either } from '@core/Either';

export default interface PokemonTypesRepository {
  getAll: () => Promise<Either<Error, PokemonType[]>>;
}
