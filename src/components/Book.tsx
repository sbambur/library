import { Button } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import useStore from '../hooks/useStore';

const Book = () => {
  const { id } = useParams();
  const { books } = useStore();
  const { title, description } = books[Number(id)];

  return (
    <div className='pt-4'>
      <h3>{title}</h3>
      <p>{description}</p>

      <NavLink to={'/'}>
        <Button>Назад</Button>
      </NavLink>
    </div>
  );
};

export default Book;
