import { memo } from 'react';
import { IBook } from '../store';

function BookItem({ data }: { data: IBook }) {
  return (
    <div className='bookCard'>
      <div className='bookCard_image'>
        <img src={data.image} alt={data.title} />
      </div>
      <div className='bookCard_author'>{data.author}</div>
      <div className='bookCard_title'>{data.title}</div>
    </div>
  );
}

export default memo(BookItem);
