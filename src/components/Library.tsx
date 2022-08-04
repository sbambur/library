import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useStore from '../hooks/useStore';
import { BookItem } from './BookItem';

function Library() {
  const { books, fetchBooks, status, bookCounter } = useStore();
  const [searchParam, setSearchParam] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className='main'>
      <div className='header'>
        <p className='header_text'>У вас на руках: {bookCounter} книг</p>
        <input
          className='header_input'
          type='text'
          value={searchParam}
          onChange={handleInput}
        />
      </div>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {status === 'done' ? (
          books.map((book, index) => (
            <Col key={book.id}>
              <NavLink to={`/book${index}`}>
                <BookItem data={book} />
              </NavLink>
            </Col>
          ))
        ) : status === 'error' ? (
          <p className='Loading Error'>Ошибка загрузки</p>
        ) : (
          <p className='Loading'>Загрузка</p>
        )}
      </Row>
    </div>
  );
}

export default observer(Library);
