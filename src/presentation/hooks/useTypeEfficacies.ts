import { useEffect, useState } from 'react';
import useSWR from 'swr';

import createGetPokemonTypeEfficaciesUsecase from '@factories/createGetPokemonTypeEfficaciesUsecase';

interface IUseTypeEfficaciesParams {
  types: number[];
}

interface IUseTypeEfficaciesResponse {
  typeEfficiency: PokemonTypeEfficiency | undefined;
  isLoading: boolean;
}

export default function useTypeEfficacies({
  types,
}: IUseTypeEfficaciesParams): IUseTypeEfficaciesResponse {
  const [isLoading, setIsLoading] = useState(true);
  const getPokemonTypeEfficaciesUsecase =
    createGetPokemonTypeEfficaciesUsecase();
  const { data, error } = useSWR([types], async typesKey => {
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
