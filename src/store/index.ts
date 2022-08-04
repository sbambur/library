import { runInAction, makeObservable, observable, action } from 'mobx';
import api from '../api';

export interface IBook {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}

export class BookStore {
  books: IBook[] = [];
  status = 'pending'; // "pending", "done" or "error"
  bookCounter = 0;
  isData = false; // if books already loaded, don't switch in "pending" status

  constructor() {
    makeObservable(this, {
      books: observable,
      status: observable,
      bookCounter: observable,
      isData: observable,
      fetchBooks: action.bound,
    });
  }

  async fetchBooks() {
    if (!this.isData) {
      this.status = 'pending';
    }

    try {
      const books = await api.get('books');
      runInAction(() => {
        this.books = books;
        this.status = 'done';
        this.isData = true;
      });
    } catch (e) {
      runInAction(() => {
        this.status = 'error';
      });
    }
  }
}

export default new BookStore();
