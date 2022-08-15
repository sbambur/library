import { useEffect } from 'react';
import { useTimeout } from 'hooks/useTimeout';

export const useDebounce = <T extends Function>(
  callback: T,
  delay: number,
  dependencies: any
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};
