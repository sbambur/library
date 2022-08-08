import moment from 'moment';
import { memo } from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IBook } from '../store';

const BookItem = ({ data }: { data: IBook }) => {
  const { returnDate, title, author, image, id } = data;
  const diffDuration = moment.duration(moment(returnDate).diff(new Date()));

  return (
    <Col>
      <NavLink to={`/book/${id}`} className={`${returnDate && 'locked'}`}>
        <div className='bookCard pt-4'>
          {returnDate && (
            <div className='returnDate-message'>
              <p>До возврата:</p>
              <p>
                {`${diffDuration.days()}:${
                  diffDuration.hours() < 10
                    ? '0' + diffDuration.hours()
                    : diffDuration.hours()
                }:${
                  diffDuration.minutes() < 10
                    ? '0' + diffDuration.minutes()
                    : diffDuration.minutes()
                }`}
              </p>
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
