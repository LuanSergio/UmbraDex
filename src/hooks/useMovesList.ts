import useSWRInfinite from 'swr/infinite';
import createGetMovesByPokemonIdUsecase from 'src/factories/createGetMovesByPokemonIdUsecase';

import Move from '@domain/entities/Move';
import MOVE_PER_REQUEST from '@constants/movePerRequest';

interface UseMoveListParams {
  fallback?: Move[][];
  pokemonId: number;
}

interface UseMoveListResponse {
  moveList: Move[][];
  isLoading: boolean;
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<Move[][]>;
}

export default function useMoveList({
  fallback,
  pokemonId,
}: UseMoveListParams): UseMoveListResponse {
  const getMovesByPokemonIdUsecase = createGetMovesByPokemonIdUsecase();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [`moveList`, pageIndex, pokemonId];
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async (key, page) => {
      const response = await getMovesByPokemonIdUsecase.getByPokemonId({
        pokemonId,
        queryName: key,
        page,
        perRequest: MOVE_PER_REQUEST,
      });

      if (response.isRight()) {
        return response.value;
      }

      throw response.value;
    },
    {
      fallbackData: fallback,
    },
  );

  return {
    moveList: data,
    isLoading: !error && !data,
    size,
    setSize,
  };
}
