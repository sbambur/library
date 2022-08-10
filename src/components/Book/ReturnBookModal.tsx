import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReturnDate } from 'hooks/useReturnDate';
import { useInterval } from 'hooks/useInterval';
import { Modal } from 'react-bootstrap';

interface ReturnBookModalProps {
  returnDate: string;
}

export const ReturnBookModal: FC<ReturnBookModalProps> = ({ returnDate }) => {
  const navigate = useNavigate();
  const getReturnDate = useReturnDate();
  const [timeLeft, setTimeLeft] = useState(() =>
    returnDate ? getReturnDate(returnDate) : null
  );

  useInterval(() => {
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
