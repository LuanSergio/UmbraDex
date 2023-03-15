import useSWR from 'swr';

import getTypeEfficacies from '@requests/getTypeEfficacies';
import { useEffect, useState } from 'react';

interface IUseTypeEfficaciesParams {
  types: string[];
}

interface IUseTypeEfficaciesResponse {
  types: string[] | undefined;
  isLoading: boolean;
}

export default function useTypeEfficacies({
  types,
}: IUseTypeEfficaciesParams): IUseTypeEfficaciesResponse {
  const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR([types], typesKey =>
    getTypeEfficacies(typesKey),
  );

  useEffect(() => {
    if (error != null || data != null) {
      setIsLoading(false);
    }
  }, [data, error]);

  return {
    types: data,
    isLoading,
  };
}
