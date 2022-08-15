import { createContext, ReactNode } from 'react';
import { BookStore } from '../store';

const store = new BookStore();
export const StoreContext = createContext(store);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
