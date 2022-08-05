import { memo } from 'react';
import { IBook } from '../store';
import { timeCounter } from './utils/timeCounter';

function BookItem({ data }: { data: IBook }) {
  return (
    <>
      <div className={`bookCard pt-4 ${data.returnDate ? 'locked' : ''}`}>
        {data.returnDate && (
          <div className='returnDate_message'>
            <p>До возврата:</p>
            <p>{timeCounter(data.returnDate)}</p>
          </div>
        )}

        <div className='bookCard_image'>
          <img src={data.image} alt={data.title} />
        </div>
        <div className='bookCard_author'>{data.author}</div>
        <div className='bookCard_title'>{data.title}</div>
      </div>
    </>
  );
}

export default memo(BookItem);
