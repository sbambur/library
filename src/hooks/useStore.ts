import { useContext } from 'react';
import { StoreContext } from '../context';

const useStore = () => {
  return useContext(StoreContext);
};
export default useStore;
