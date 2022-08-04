import { createContext, ReactNode } from 'react';
import { BookStore } from '../store';

interface StoreContextProviderProps {
  children?: ReactNode;
}

const store = new BookStore();
export const StoreContext = createContext(store);

export function StoreContextProvider({ children }: StoreContextProviderProps) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}
