import { Either } from '@core/Either';
import Move from '@domain/entities/Move';

export default interface MoveRepository {
  getByPokemonId: (pokemonId: number) => Promise<Either<Error, Move[]>>;
}
