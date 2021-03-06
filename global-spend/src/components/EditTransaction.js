import { useNavigate, useParams } from "react-router-dom"
import { Form, Button, Modal } from "react-bootstrap"
import { useContext } from 'react'

// api
import BackendAPI from "../api/BackendAPI"

// components
import EnvelopeDropdown from "../components/EnvelopeDropdown"
import StoreDropdown from "../components/StoreDropdown"
import IsDebitDropdown from "../components/IsDebitDropdown"

// context
import TransactionArrayContext from "../context/TransactionArrayContext"


function EditTransaction(props) {
  const {transactionArray, setTransactionArray} = useContext(TransactionArrayContext)
  const navigate = useNavigate()

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const promiseArray = []

    // determine if spend amount changed...default to old amount if not changed
    let oldAmt = props.transaction.original_transaction_amt
    let oldHomeAmt = parseFloat(props.transaction.home_transaction_amt)
    let newAmt = event.target.elements[1].value
    let newHomeAmt = parseFloat(props.transaction.home_transaction_amt)
    if (oldAmt != newAmt) {
      newHomeAmt = parseFloat(newAmt * props.rate).toFixed(2) 
    }
    let deltaHomeAmt = newHomeAmt - oldHomeAmt // positive if money spent increased
    
    // set up for determining if envelope changed
    let newEnvelope = event.target.elements[3].value
    let oldEnvelopeCurrentAmt = null
    let newEnvelopeCurrentAmt = null
    let oldEnvelopeUpdatedAmt = null
    let newEnvelopeUpdatedAmt = null

    const oldEnvelopeData = await BackendAPI.fetchEnvelopeByID(props.transaction.envelope)
    if (oldEnvelopeData) {
      oldEnvelopeCurrentAmt = parseFloat(oldEnvelopeData.current_amt)
    }
    
    const newEnvelopeData = await BackendAPI.fetchEnvelopeByID(newEnvelope)
    if (newEnvelopeData) {
      newEnvelopeCurrentAmt = parseFloat(newEnvelopeData.current_amt)
    }

    // for case when envelope stays the same and there is a change in money spent
    if (props.transaction.envelope == newEnvelope && deltaHomeAmt != 0) {
      oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt - deltaHomeAmt

      // update envelopes
      const envelopeObj = {
        current_amt: oldEnvelopeUpdatedAmt
      }
      promiseArray.push(await BackendAPI.updateEnvelope(envelopeObj, props.transaction.envelope))
    }

    // for case when envelope changes
    if (props.transaction.envelope != newEnvelope) {
      if (props.transaction.is_debit_transaction) {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt + oldHomeAmt
        newEnvelopeUpdatedAmt = newEnvelopeCurrentAmt - newHomeAmt
      } else {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt - oldHomeAmt
        newEnvelopeUpdatedAmt = newEnvelopeCurrentAmt + newHomeAmt
      }

      // update envelopes
      const envelopeObj1 = {
        current_amt: oldEnvelopeUpdatedAmt
      }
      promiseArray.push(await BackendAPI.updateEnvelope(envelopeObj1, props.transaction.envelope))

      const envelopeObj2 = {
        current_amt: newEnvelopeUpdatedAmt
      }
      promiseArray.push(await BackendAPI.updateEnvelope(envelopeObj2, newEnvelope))
    }
   
    const transactionObj = {
      transaction_date: event.target.elements[0].value,
      original_transaction_amt: newAmt,
      home_transaction_amt: newHomeAmt,
      is_debit_transaction: props.transaction.is_debit_transaction,
      envelope: event.target.elements[3].value,
      store: event.target.elements[4].value,
      notes: event.target.elements[5].value
    }
    promiseArray.push(await BackendAPI.updateTransaction(transactionObj, props.transaction.id))

    Promise.all(promiseArray)
    .then(values => {
      navigate(`/transaction/`)
    })
    .catch(error => {
      console.error(error.message)
    })
  }

  // render
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Store
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Transaction Date</Form.Label>
            <Form.Control placeholder="date" defaultValue={props.transaction && props.transaction.transaction_date}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Spent in local currency</Form.Label>
            <Form.Control placeholder="amt in local" defaultValue={props.transaction && props.transaction.original_transaction_amt}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Debit or deposit</Form.Label>
            <Form.Control readonly='readonly' defaultValue={props.transaction && (props.transaction.is_debit_transaction ? "Debit" : "Deposit")}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Envelope</Form.Label>
            <div><EnvelopeDropdown defaultValue={props.transaction && props.transaction.envelope}/></div>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Store</Form.Label>
            <div><StoreDropdown defaultValue={props.transaction && props.transaction.store}/></div>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control placeholder="notes" defaultValue={props.transaction && props.transaction.notes} />
          </Form.Group>

          <br />
          <div className="text-center">
            <Button variant="success" type="submit">
              Edit Transaction
            </Button>  
          </div>
        </Form>  
      </Modal.Body>
      <Modal.Footer>
        <Button className='generic-btn' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditTransaction;