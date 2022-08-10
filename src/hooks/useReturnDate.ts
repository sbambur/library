import moment from 'moment';
import { useCallback } from 'react';

export const useReturnDate = () => {
  const getReturnDate = useCallback((returnDate: string) => {
    const diffDuration = moment.duration(moment(returnDate).diff(moment()));
    const timesLeft = `${diffDuration.days()}:${diffDuration.hours()}:${diffDuration.minutes()}`;

    return moment(timesLeft, 'DD-hh-mm').format('DD:hh:mm');
  }, []);

  return getReturnDate;
};
