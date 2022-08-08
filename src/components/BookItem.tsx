import moment from 'moment';
import { memo } from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IBook } from '../store';

const BookItem = ({ data }: { data: IBook }) => {
  const { returnDate, title, author, image, id } = data;

  const diffDuration = moment.duration(moment(returnDate).diff(moment()));
  const timesLeft = `${diffDuration.days()}:${diffDuration.hours()}:${diffDuration.minutes()}`;

  return (
    <Col>
      <NavLink to={`/book/${id}`} className={`${returnDate && 'locked'}`}>
        <div className='bookCard pt-4'>
          {returnDate && (
            <div className='bookCard_returnDate'>
              <p>До возврата:</p>
              <p>{moment(timesLeft, 'DD-hh-mm').format('DD:hh:mm')}</p>
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
