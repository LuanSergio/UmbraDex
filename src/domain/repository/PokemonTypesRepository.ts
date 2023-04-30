import PokemonType from '@domain/entities/PokemonType';
import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';
import { Either } from '@core/Either';

export default interface PokemonTypesRepository {
  getAll: () => Promise<Either<Error, PokemonType[]>>;
  getPokemonTypeEfficacies: (
    typesId: number[],
  ) => Promise<Either<Error, PokemonTypeEfficiency>>;
}
