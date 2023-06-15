import { useEffect, useState } from 'react';

function useThrottleValue<T>(value: T, delay: number): [T, boolean] {
  const [throttledValue, setThrottledValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setThrottledValue(value);
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [throttledValue, isLoading];
}

export default useThrottleValue;
