import { IBook } from '../store';

interface BookItemProps {
  data: IBook;
}

export function BookItem({ data }: BookItemProps) {
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
