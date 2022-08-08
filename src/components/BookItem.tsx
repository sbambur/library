import { memo } from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IBook } from '../store';
import { timeCounter } from './utils/timeCounter';

const BookItem = ({ data }: { data: IBook }) => {
  const { returnDate, title, author, image, id } = data;

  return (
    <Col>
      <NavLink to={`/book/${id}`} className={returnDate ? 'locked' : ''}>
        <div className='bookCard pt-4'>
          {returnDate && (
            <div className='returnDate-message'>
              <p>До возврата:</p>
              <p>{timeCounter(returnDate)}</p>
            </div>
          )}

          <div className='bookCard_image'>
            <img src={image} alt={title} />
          </div>
          <div className='bookCard_author'>{author}</div>
          <div className='bookCard_title'>{title}</div>
        </div>
      </NavLink>
    </Col>
  );
};

export default memo(BookItem);
