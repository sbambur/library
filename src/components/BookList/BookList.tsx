import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BookItem } from '../BookItem';
import useStore from 'hooks/useStore';
import useDebounce from 'hooks/useDebounce';
import { getBookingBook } from '../utils/bookingCounter';
import { Row } from 'react-bootstrap';
import { ICONS } from 'public';
import './style.css';

export const BookList = observer(() => {
  const { books, bookCounter } = useStore();
  const [searchParam, setSearchParam] = useState('');
  const [amountBooks, setAmountBooks] = useState(() => {
    const amountFromStorage = Number(sessionStorage.getItem('books-amount')) || 9;
    sessionStorage.removeItem('books-amount');
    return amountFromStorage;
  });
  const [currentBooksList, setCurrentBookList] = useState(books.slice(0, amountBooks));

  const scrollHandler = useCallback(() => {
    const scrollDiff =
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100;

    if (scrollDiff && amountBooks < books.length) {
      setAmountBooks((prevState) => prevState + 9);
    }
  }, [amountBooks, books]);

  useDebounce(
    () => {
      const filteredList =
        searchParam.length >= 2
          ? books.filter(
              (book) =>
                book.title.toLowerCase().includes(searchParam.toLowerCase()) ||
                book.description.toLowerCase().includes(searchParam.toLowerCase())
            )
          : books;
      setCurrentBookList(filteredList.slice(0, amountBooks));
    },
    500,
    [searchParam]
  );

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    setCurrentBookList(books.slice(0, amountBooks));
    sessionStorage.setItem('books-amount', String(amountBooks));
  }, [books, amountBooks]);

  return (
    <div className='main'>
      <div className='header'>
        <p className='header_text'>У вас на руках: {getBookingBook(bookCounter)}</p>

        <div className='header_input'>
          <img src={ICONS.Magnifier} alt='magnifier' />
          <input
            type='text'
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>
      </div>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {currentBooksList.map((book) => (
          <BookItem key={book.id} data={book} />
        ))}
      </Row>
    </div>
  );
});
