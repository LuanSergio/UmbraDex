import { Either } from '@core/Either';
import Move from '@domain/entities/Move';

interface GetByPokemonIdParams {
  pokemonId: number;
  groupVersionId: number;
}

export default interface MoveRepository {
  getByPokemonId: ({
    pokemonId,
    groupVersionId,
  }: GetByPokemonIdParams) => Promise<Either<Error, Move[]>>;
}
