import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useStore from '../hooks/useStore';
import BookItem from './BookItem';
import { debounce } from './utils/debounce';

const Library = () => {
  const { books, bookCounter } = useStore();

  const [searchParam, setSearchParam] = useState('');
  const [scrollPosition] = useState(sessionStorage.getItem('scroll-position') || null);
  const [amountBooks, setAmountBooks] = useState(
    Number(sessionStorage.getItem('books-amount')) || 9
  );
  const [currentBooksList, setCurrentBookList] = useState(books.slice(0, amountBooks));

  sessionStorage.removeItem('books-amount');
  sessionStorage.removeItem('scroll-position');

  const scrollHandler = useCallback(
    (e: any) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
        100
      ) {
        if (amountBooks < books.length) {
          setAmountBooks((prevState) => prevState + 9);
        }
      }
    },
    [amountBooks, books.length]
  );

  const setScrollPosition = (scroll: string) => {
    sessionStorage.setItem('scroll-position', scroll);
  };

  const debounceSetter = debounce(
    () => setScrollPosition(String(window.pageYOffset)),
    500
  );

  useEffect(() => {
    window.scrollTo(0, Number(scrollPosition));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('books-amount', String(amountBooks));

    if (books.length !== currentBooksList.length) {
      setCurrentBookList(books.slice(0, amountBooks));
    }

    document.addEventListener('scroll', debounceSetter);
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', debounceSetter);
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [books, amountBooks, currentBooksList.length, debounceSetter, scrollHandler]);

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
        {currentBooksList.map((book, index) => (
          <Col key={book.id}>
            {book.returnDate ? (
              <BookItem data={book} />
            ) : (
              <NavLink to={`/book/${index}`}>
                <BookItem data={book} />
              </NavLink>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default observer(Library);
