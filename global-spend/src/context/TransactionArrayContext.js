import { createContext } from 'react';

const TransactionArrayContext = createContext({
  transactionArray: [], 
  setTransactionArray: [], 
});

export default TransactionArrayContext;