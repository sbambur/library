import { observer } from 'mobx-react-lite';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useStore from '../hooks/useStore';
import BookItem from './BookItem';
import { debounce } from './utils/debounce';

function Library() {
  const { books, bookCounter } = useStore();

  const [searchParam, setSearchParam] = useState('');
  const [scrollPosition] = useState(() => {
    const persistedPosition = sessionStorage.getItem('scroll-position');
    sessionStorage.removeItem('scroll-position');
    return persistedPosition ? persistedPosition : null;
  });
  const [amountBooks, setAmountBooks] = useState(() => {
    const persistedAmount = sessionStorage.getItem('books-amount');
    sessionStorage.removeItem('books-amount');
    return persistedAmount ? Number(persistedAmount) : 9;
  });
  const [currentBooksList, setCurrentBookList] = useState(books.slice(0, amountBooks));

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

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

  const setScrolPosition = (scroll: number) => {
    sessionStorage.setItem('scroll-position', JSON.stringify(scroll));
  };

  const debounceSetter = debounce(() => setScrolPosition(window.pageYOffset), 500);

  useEffect(() => {
    window.scrollTo(0, Number(scrollPosition));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('books-amount', JSON.stringify(amountBooks));

    if (books.length !== currentBooksList.length) {
      setCurrentBookList(books.slice(0, amountBooks));
    }
  }, [books, amountBooks, currentBooksList.length]);

  useEffect(() => {
    document.addEventListener('scroll', debounceSetter);
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', debounceSetter);
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [debounceSetter, scrollHandler]);

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
}

export default observer(Library);
