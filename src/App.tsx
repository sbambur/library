import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Book from './components/Book';
import Library from './components/Library';

const App = () => {
  return (
    <Container className='mb-4'>
      <Routes>
        <Route path='/' element={<Library />} />
        <Route path='/book/:id' element={<Book />} />
      </Routes>
    </Container>
  );
};

export default App;
