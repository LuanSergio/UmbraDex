import { useEffect, useState } from 'react';
import useSWR from 'swr';

import createGetPokemonTypeEfficaciesUsecase from 'src/factories/createGetPokemonTypeEfficaciesUsecase';
import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';

import useThrottleValue from '@hooks/useThrottleValue';

interface UseTypeEfficaciesParams {
  types: number[];
}

interface UseTypeEfficaciesResponse {
  typeEfficiency: PokemonTypeEfficiency | undefined;
  isLoading: boolean;
}

export default function useTypeEfficacies({
  types,
}: UseTypeEfficaciesParams): UseTypeEfficaciesResponse {
  const [isLoading, setIsLoading] = useState(true);
  const getPokemonTypeEfficaciesUsecase =
    createGetPokemonTypeEfficaciesUsecase();

  const [throttledTypes, isThrottling] = useThrottleValue(types, 2000);

  const { data, error } = useSWR([throttledTypes], async typesKey => {
    const response = await getPokemonTypeEfficaciesUsecase.getTypeEfficacies(
      typesKey,
    );

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

  const combinedLoading = isLoading || isThrottling;

  return {
    typeEfficiency: data,
    isLoading: combinedLoading,
  };
}
