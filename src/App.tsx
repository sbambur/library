import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { Book } from './components/Book';
import { BookList } from './components/BookList';

const App = () => {
  return (
    <Container className='mb-4'>
      <Routes>
        <Route path='/' element={<BookList />} />
        <Route path='/book/:id' element={<Book />} />
      </Routes>
    </Container>
  );
};

export default App;
