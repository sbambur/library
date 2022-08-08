import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import useStore from '../hooks/useStore';
import BookItem from './BookItem';

const Library = () => {
  const { books, bookCounter } = useStore();
  const [searchParam, setSearchParam] = useState('');
  const [amountBooks, setAmountBooks] = useState(
    Number(sessionStorage.getItem('books-amount')) || 9
  );
  const [currentBooksList, setCurrentBookList] = useState(books.slice(0, amountBooks));

  sessionStorage.removeItem('books-amount');
  sessionStorage.removeItem('scroll-position');

  const scrollHandler = useCallback(() => {
    const scrollDiff =
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100;

    if (scrollDiff && amountBooks < books.length) {
      setAmountBooks((prevState) => prevState + 9);
    }
  }, [amountBooks, books.length]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    sessionStorage.setItem('books-amount', String(amountBooks));

    if (books.length !== currentBooksList.length) {
      setCurrentBookList(books.slice(0, amountBooks));
    }
  }, [books, amountBooks, currentBooksList.length]);

  return (
    <div className='main'>
      <div className='header'>
        <p className='header_text'>У вас на руках: {bookCounter} книг</p>
        <input
          className='header_input'
          type='text'
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </div>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {currentBooksList.map((book) => (
          <BookItem key={book.id} data={book} />
        ))}
      </Row>
    </div>
  );
};

export default observer(Library);
