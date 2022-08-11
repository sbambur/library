import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useReturnDate } from 'hooks/useReturnDate';
import { useInterval } from 'hooks/useInterval';
import { Modal } from 'react-bootstrap';
import useStore from 'hooks/useStore';

interface ReturnBookModalProps {
  returnDate: string;
  id: string;
}

export const ReturnBookModal: FC<ReturnBookModalProps> = ({ returnDate, id }) => {
  const navigate = useNavigate();
  const { ReturnBook } = useStore();
  const getReturnDate = useReturnDate();
  const [timeLeft, setTimeLeft] = useState(() =>
    returnDate ? getReturnDate(returnDate) : null
  );

  useInterval(() => {
    moment() > moment(returnDate) && ReturnBook(Number(id));

    returnDate && setTimeLeft(getReturnDate(returnDate));
  }, returnDate);

  return (
    <Modal show={true}>
      <div className='modal_inner'>
        <div className='return_date_info'>
          <p>До возврата:</p>
          <p>{timeLeft}</p>
        </div>
        <div className='controls justify-content-center'>
          <button className='button dark small' onClick={() => navigate('/')}>
            Вернуться на главную
          </button>
        </div>
      </div>
    </Modal>
  );
};
