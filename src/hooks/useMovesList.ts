import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import Move from '@domain/entities/Move';
import createGetMovesByPokemonIdUsecase from 'src/factories/createGetMovesByPokemonIdUsecase';

import MOVE_PER_REQUEST from '@constants/movePerRequest';
import useThrottleValue from '@hooks/useThrottleValue';

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
  const [isLoading, setIsLoading] = useState(true);
  const [throttledPokemonId, isThrottling] = useThrottleValue(pokemonId, 2000);

  const getMovesByPokemonIdUsecase = createGetMovesByPokemonIdUsecase();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [`moveList`, pageIndex, throttledPokemonId];
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async (key, page) => {
      const response = await getMovesByPokemonIdUsecase.getByPokemonId({
        pokemonId: throttledPokemonId,
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

  useEffect(() => {
    if (error != null || data != null) {
      setIsLoading(false);
    }
  }, [data, error]);

  const combinedLoading = isLoading || isThrottling;

  return {
    moveList: data,
    isLoading: combinedLoading,
    size,
    setSize,
  };
}
