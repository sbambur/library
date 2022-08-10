import { memo } from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useReturnDate } from '../../hooks/useReturnDate';
import { IBook } from '../../store';
import './style.css';

export const BookItem = memo(({ data }: { data: IBook }) => {
  const { returnDate, title, author, image, id } = data;
  const getReturnDate = useReturnDate();

  return (
    <Col>
      <NavLink to={`/book/${id}`} className={`${returnDate && 'locked'}`}>
        <div className='bookCard pt-4'>
          {returnDate && (
            <div className='return_date'>
              <div className='return_date_info'>
                <p>До возврата:</p>
                <p>{getReturnDate(returnDate)}</p>
              </div>
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
});
