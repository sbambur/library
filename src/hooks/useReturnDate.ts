import moment from 'moment';
import { useCallback } from 'react';

export const useReturnDate = () => {
  const getReturnDate = useCallback((returnDate: string) => {
    const diffDuration = moment.duration(moment(returnDate).diff(moment()));

    const hours = diffDuration.days() * 24 + diffDuration.hours() || '0';
    const minutesAndSeconds = moment(
      `${diffDuration.minutes()}:${diffDuration.seconds()}`,
      'mm-ss'
    ).format(':mm:ss');

    return hours + minutesAndSeconds;
  }, []);

  return getReturnDate;
};
