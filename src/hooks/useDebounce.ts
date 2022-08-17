import { useEffect } from 'react';
import { useTimeout } from 'hooks/useTimeout';

export const useDebounce = <T>(
  callback: () => unknown,
  delay: number,
  dependencies: T[]
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
};
