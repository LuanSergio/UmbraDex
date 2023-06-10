import { Either } from '@core/Either';
import Move from '@domain/entities/Move';

interface GetByPokemonIdParams {
  pokemonId: number;
  groupVersionId: number;
  queryName: string;
  page: number;
  perRequest: number;
}

export default interface MoveRepository {
  getByPokemonId: ({
    pokemonId,
    groupVersionId,
    page,
    perRequest,
    queryName,
  }: GetByPokemonIdParams) => Promise<Either<Error, Move[]>>;
}
