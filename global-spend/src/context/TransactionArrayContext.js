import { createContext } from 'react';

const TransactionArrayContext = createContext({
  transactionArray: null, 
  setTransactionArray: () => {}, 
});

export default TransactionArrayContext;