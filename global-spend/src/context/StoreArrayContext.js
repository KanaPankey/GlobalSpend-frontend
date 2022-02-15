import { createContext } from 'react';

const StoreArrayContext = createContext({
  storeArray: [], 
  setStoreArray: [], 
});

export default StoreArrayContext;