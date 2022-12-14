import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { useReturnDate } from 'hooks/useReturnDate';
import { useInterval } from 'hooks/useInterval';
import useStore from 'hooks/useStore';
import { IBook } from 'store';
import { Col } from 'react-bootstrap';
import { CheckLg } from 'react-bootstrap-icons';
import './style.css';

export const BookItem = observer(({ data }: { data: IBook }) => {
  const { returnDate, title, author, image, id } = data;
  const { ReturnBook } = useStore();
  const getReturnDate = useReturnDate();
  const [timeLeft, setTimeLeft] = useState(() =>
    returnDate ? getReturnDate(returnDate) : null
  );

  const setReturn = useCallback(() => {
    moment() > moment(returnDate) && ReturnBook(id);
  }, [returnDate, id, ReturnBook]);

  useEffect(() => {
    setReturn();
  }, [setReturn]);

  useInterval(() => {
    setReturn();
    returnDate && setTimeLeft(getReturnDate(returnDate));
  }, returnDate);

  return (
    <Col>
      <div className={`book_card pt-4 ${returnDate && 'locked'}`}>
        {returnDate && (
          <div className='return_date'>
            <div className='return_date_info'>
              <p>До возврата:</p>
              <p>{timeLeft}</p>
            </div>

            <div className='return_button'>
              <button className='button small' onClick={() => ReturnBook(id)}>
                Вернуть книгу <CheckLg color='green' />
              </button>
            </div>
          </div>
        )}

        <NavLink to={`/book/${id}`}>
          <div className='book_card_inner'>
            <div className='book_card_image'>
              <img src={image} alt={title} />
            </div>
            <div className='book_card_author'>{author}</div>
            <div className='book_card_title'>{title}</div>
          </div>
        </NavLink>
      </div>
    </Col>
  );
});
