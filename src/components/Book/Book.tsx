import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { ReturnBookModal } from './ReturnBookModal';
import useStore from 'hooks/useStore';
import { IBook } from 'store';
import { Modal } from 'react-bootstrap';
import './style.css';

export const Book = observer(() => {
  const { id } = useParams();
  const { books, BookingBook } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const { author, title, description, image, returnDate } = books.find(
    (book) => book.id === Number(id)
  ) as IBook;

  const handleBookingBook = () => {
    const newDate = new Date(date).toISOString();
    id && BookingBook({ id, returnDate: newDate });
    navigate('/');
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
            <button className='button dark small' onClick={() => handleBookingBook()}>
              Читать книгу
            </button>
          </div>
        </div>
      </Modal>

      {returnDate && <ReturnBookModal returnDate={returnDate} />}
    </>
  );
});
