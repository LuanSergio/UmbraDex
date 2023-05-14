import { useEffect, useState } from 'react';
import useSWR from 'swr';

import createGetPokemonTypeEfficaciesUsecase from '@factories/createGetPokemonTypeEfficaciesUsecase';
import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';

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
  const { data, error } = useSWR([types], async typesKey => {
    console.log('🚀 ~ typesKey:', typesKey, 'types', types);
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

  return {
    typeEfficiency: data,
    isLoading,
  };
}
