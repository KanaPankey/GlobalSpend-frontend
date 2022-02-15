import { createContext } from 'react';

const StoreArrayContext = createContext({
  storeArray: null, 
  setStoreArray: () => {}, 
});

export default StoreArrayContext;