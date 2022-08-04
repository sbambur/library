import { NavLink, useParams } from 'react-router-dom';
import useStore from '../hooks/useStore';

export default function Book() {
  const { id } = useParams();
  const { books } = useStore();

  return (
    <>
      <NavLink to={'/'}>Назад</NavLink>
      <h3>{books[Number(id)].title}</h3>
      <p>{books[Number(id)].description}</p>
    </>
  );
}
