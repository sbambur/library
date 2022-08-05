import { memo } from 'react';
import { IBook } from '../store';
import { timeCounter } from './utils/timeCounter';

const BookItem = ({ data }: { data: IBook }) => {
  const { returnDate, title, author, image } = data;

  return (
    <div className={`bookCard pt-4 ${data.returnDate && 'locked'}`}>
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
  );
};

export default memo(BookItem);
