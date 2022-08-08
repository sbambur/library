import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../hooks/useStore';
import { IBook } from '../store';

const Book = () => {
  const { id } = useParams();
  const { books } = useStore();
  const navigate = useNavigate();
  const { title, description } = books.find((book) => book.id === Number(id)) as IBook;

  return (
    <div className='pt-4'>
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={() => navigate(-1)}>Назад</Button>
    </div>
  );
};

export default Book;
