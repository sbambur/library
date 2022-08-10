import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { mockbooks } from '../mock/book';

export interface IBook {
  id: number;
  title: string;
  author: string;
  returnDate: string | null;
  description: string;
  image: string;
}

export interface IBookingBook {
  id: string;
  returnDate: string;
}

export class BookStore {
  books: IBook[] = mockbooks;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'BookStore',
      properties: ['books'],
      storage: window.localStorage,
    });
  }

  public ReturnBook = (id: number) => {
    const updatedBooks = this.books.map((book) => {
      if (book.id === id) {
        book.returnDate = null;
      }
      return book;
    });
    this.books = updatedBooks;
  };

  public BookingBook = (bookingBook: IBookingBook) => {
    const { id, returnDate } = bookingBook;

    const updatedBooks = this.books.map((book) => {
      if (book.id === Number(id)) {
        book.returnDate = returnDate;
      }
      return book;
    });
    this.books = updatedBooks;
  };

  get bookCounter() {
    const bookingBooks = this.books.filter((book) => book.returnDate).length;
    return bookingBooks;
  }
}
