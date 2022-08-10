import { useEffect } from 'react';
import useTimeout from 'hooks/useTimeout';

export default function useDebounce<T extends Function>(
  callback: T,
  delay: number,
  dependencies: any
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, []);
}
