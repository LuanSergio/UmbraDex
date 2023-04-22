import Pokemon from '@domain/entities/Generation';
import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';
import { Either } from '@core/Either';

interface GetAllParams {
  queryName?: string;
  page: number;
  search?: string;
  generationsFilter?: string[];
  primaryTypeFilter?: string[];
  secondaryTypeFilter?: string[];
  sortValue?: string;
}

export default interface PokemonRepository {
  getAll: (params: GetAllParams) => Promise<Either<Error, Pokemon[]>>;
  get: (id: number) => Promise<Either<Error, Pokemon>>;
  getTypeEfficacies: (
    typesId: number[],
  ) => Promise<Either<Error, PokemonTypeEfficiency>>;
}
