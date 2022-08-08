import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import useStore from '../hooks/useStore';
import BookItem from './BookItem';
import { debounce } from './utils/debounce';

const Library = () => {
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
  }, [amountBooks, books.length]);

  const debounceFilter = debounce(() => {
    const filteredList =
      searchParam.length >= 2
        ? books.filter(
            (book) =>
              book.title.toLowerCase().includes(searchParam.toLowerCase()) ||
              book.description.toLowerCase().includes(searchParam.toLowerCase())
          )
        : books;

    setCurrentBookList(filteredList.slice(0, amountBooks));
  }, 500);

  useEffect(() => {
    debounceFilter();
  }, [searchParam]);

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
  }, [amountBooks]);

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
