import { Button } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import useStore from '../hooks/useStore';

export default function Book() {
  const { id } = useParams();
  const { books } = useStore();

  return (
    <div className='pt-4'>
      <h3>{books[Number(id)].title}</h3>
      <p>{books[Number(id)].description}</p>

      <NavLink to={'/'}>
        <Button>Назад</Button>
      </NavLink>
    </div>
  );
}
