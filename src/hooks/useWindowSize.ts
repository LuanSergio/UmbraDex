import { useEffect, useState } from 'react';

export default function useWindowSize(): number[] {
  const [size, setSize] = useState([0, 0]);
  useEffect((): (() => void) => {
    function updateSize(): void {
      setSize([
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ]);
    }

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
