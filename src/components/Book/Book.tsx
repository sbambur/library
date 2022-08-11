import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { ReturnBookModal } from './ReturnBookModal';
import useStore from 'hooks/useStore';
import { IBook } from 'store';
import { Modal } from 'react-bootstrap';
import { ICONS } from 'public';
import './style.css';

export const Book = observer(() => {
  const { id } = useParams();
  const { books, BookingBook } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const { author, title, description, image, returnDate } = books.find(
    (book) => book.id === Number(id)
  ) as IBook;

  const handleBookingBook = () => {
    if (!date) {
      setErrors(true);
      return;
    }
    const newDate = new Date(date).toISOString();
    id && BookingBook({ id, returnDate: newDate });
    navigate('/');
  };

  const handleDateChange = (value: string) => {
    if (moment(value) < moment()) {
      setDate(null);
      setErrors(true);
      return;
    }
    setDate(value);
    setErrors(false);
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
            <div className={`modal_input ${errors && 'error'}`}>
              <img src={ICONS.Calendar} alt='calendar' />
              <input type='date' onChange={(e) => handleDateChange(e.target.value)} />
            </div>
            <button
              className='button dark small'
              onClick={() => handleBookingBook()}
              disabled={!date}
            >
              Читать книгу
            </button>
          </div>
        </div>
      </Modal>

      {returnDate && id && <ReturnBookModal returnDate={returnDate} id={id} />}
    </>
  );
});
