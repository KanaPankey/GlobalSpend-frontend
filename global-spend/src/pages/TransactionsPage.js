// react
import { useEffect, useState, useContext } from 'react'

// css
import Button from 'react-bootstrap/Button'

// api
import BackendAPI from '../api/BackendAPI'

// css
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap'

// components
import EditTransaction from '../components/EditTransaction';

// context
import TransactionArrayContext from '../context/TransactionArrayContext';
import StoreArrayContext from '../context/StoreArrayContext';


function TransactionPage(props) {
  // states
  const {transactionArray, setTransactionArray} = useContext(TransactionArrayContext)
  const {storeArray, setStoreArray} = useContext(StoreArrayContext)
  const [envelopeArray, setEnvelopeArray] = useState([])
  const [transactionModal, setTransactionModal] = useState(0)

  // populates array of transaction objects
  useEffect(() => {
    const getTransactionArray = async() => {
      const data = await BackendAPI.fetchTransactions()
      if (data) {
        setTransactionArray(data)
      }
    }
    getTransactionArray()
  }, [])

  // populates array of envelope objects
  useEffect(() => {
    const getEnvelopeArray = async() => {
      const data = await BackendAPI.fetchEnvelopes()
      if (data) {
        setEnvelopeArray(data)
      }
    }
    getEnvelopeArray()
  }, [])

  // helper functions
  // store id to name
  const displayStoreName = (storeID) => {
    console.log("in displaystore", storeArray)
    for (let i = 0; i < storeArray.length; i++) {
      console.log("displaystorname", storeID)
      if (storeArray[i].id == storeID) {
        return storeArray[i].store_name
      }
    }
  }

  const deleteTransaction = async(transactionID) => {
    const data = await BackendAPI.deleteTransaction(transactionID)
    const transactionList = await BackendAPI.fetchTransactions()
    if (transactionList) {
      setTransactionArray(transactionList)
    }
  }

  return (
    <div className="transaction-list container mt-4">
      <h1>Transactions</h1>
      <hr />
      {transactionArray.map((transaction, index) => {
          return (
            <div key={index}>
              <Row className='transaction-detail-row'>
                <Col>{transaction.transaction_date}</Col>
                <Col>{transaction.store}</Col>
                <Col>{displayStoreName(transaction.store)}</Col>
                <Col>{transaction.home_transaction_amt}</Col>
                <Col>
                  <>
                    <Button className='edit-icon' variant="primary" onClick={() => setTransactionModal(transaction.id)}>
                      <FaEdit />
                    </Button>
                    <EditTransaction transactionModal={transactionModal} setTransactionModal={setTransactionModal} transaction={transaction} show={transactionModal==transaction.id} onHide={() => setTransactionModal(false)} />
                  </>{' '}
                  <Button className="delete-icon" onClick={() => deleteTransaction(transaction.id)} >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
              <hr />
            </div>
          )
      })}
    </div>
  )
}

export default TransactionPage;