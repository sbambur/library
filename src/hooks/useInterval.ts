import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => unknown, returnDate: string | null) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (!returnDate) return;

    const intervalId = setInterval(() => savedCallback.current(), 1000);

    return () => clearInterval(intervalId);
  }, [returnDate]);
};
