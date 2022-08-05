import { makeAutoObservable } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
import { mockbooks } from '../mock/book';

export interface IBook {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}

export class BookStore {
  books: IBook[] = mockbooks;
  bookCounter = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'BookStore',
      properties: ['books'],
      storage: window.localStorage,
    });
  }

  stopStore() {
    stopPersisting(this);
  }
}
