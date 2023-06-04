import { Either } from '@core/Either';

import Pokemon from '@domain/entities/Pokemon';
import PokemonSummary from '@domain/entities/PokemonSummary';

export interface GetAllParams {
  queryName?: string;
  page: number;
  pokemonPerRequest: number;
  search?: string;
  generationsFilter?: string[];
  primaryTypeFilter?: string[];
  secondaryTypeFilter?: string[];
  sortValue?: string;
}

export default interface PokemonRepository {
  getAll: (params: GetAllParams) => Promise<Either<Error, PokemonSummary[]>>;
  getById: (id: number) => Promise<Either<Error, Pokemon>>;
}
