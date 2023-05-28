import { useEffect, useState } from 'react';
import useSWR from 'swr';

import createGetMovesByPokemonIdUsecase from '@factories/createGetMovesByPokemonIdUsecase';
import Move from '@domain/entities/Move';

interface UseMoveListParams {
  pokemonId: number;
  groupVersionId: number;
}

interface UseMoveListResponse {
  moveList: Move[] | undefined;
  isLoading: boolean;
}

export default function useMoveList({
  pokemonId,
  groupVersionId,
}: UseMoveListParams): UseMoveListResponse {
  const [isLoading, setIsLoading] = useState(true);

  const getMovesByPokemonIdUsecase = createGetMovesByPokemonIdUsecase();

  const { data, error } = useSWR(`${pokemonId}`, async () => {
    const response = await getMovesByPokemonIdUsecase.getByPokemonId({
      pokemonId,
      groupVersionId,
    });

    if (response.isRight()) {
      return response.value;
    }

    throw response.value;
  });

  useEffect(() => {
    if (error != null || data != null) {
      setIsLoading(false);
    }
  }, [data, error]);

  return {
    moveList: data,
    isLoading,
  };
}
