import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useReturnDate } from '../hooks/useReturnDate';
import useStore from '../hooks/useStore';
import { IBook } from '../store';

const Book = () => {
  const { id } = useParams();
  const { books } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const getReturnDate = useReturnDate();
  const { author, title, description, image, returnDate } = books.find(
    (book) => book.id === Number(id)
  ) as IBook;

  const handleReadBook = () => {
    console.log(date);
    setShowModal(false);
  };

  return (
    <>
      <div className='book'>
        <div className='book_image'>
          <img src={image} alt={title} />
        </div>
        <div className='book_header'>
          <p className='book_author'>{author}</p>
          <h1 className='book_title'>{title}</h1>
          <p className='book_description'>{description}</p>
        </div>

        <div className='controls'>
          <button className='button light' onClick={() => navigate(-1)}>
            Вернуться
          </button>
          <button className='button dark' onClick={() => setShowModal(true)}>
            Читать книгу
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div className='modal_inner'>
          <div className='modal_image'>
            <img src={image} alt={title} />
          </div>
          <p>Установите время на чтение</p>
          <div className='controls'>
            <div className='modal_input'>
              <span className='input_icon'></span>
              <input type='date' onChange={(e) => setDate(e.target.value)} />
            </div>
            <button className='button dark small' onClick={handleReadBook}>
              Читать книгу
            </button>
          </div>
        </div>
      </Modal>

      {returnDate && (
        <Modal show={true}>
          <div className='modal_inner'>
            <div className='return_date_info'>
              <p>До возврата:</p>
              <p>{getReturnDate(returnDate)}</p>
            </div>
            <div className='controls justify-content-center'>
              <button className='button dark small' onClick={() => navigate('/')}>
                Вернуться на главную
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Book;
