// react
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

// css
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// context
import EnvelopeArrayContext from '../context/EnvelopeArrayContext'

// api
import BackendAPI from '../api/BackendAPI'

function AddEditEnvelope(props) {
  const navigate = useNavigate()

  // states
  const { envelopeArray, setEnvelopeArray } = useContext(EnvelopeArrayContext)

  // changes depending on whether adding or editing
  const editingEnvelope = props.envelope
  const action = editingEnvelope ? "Edit" : "Add"

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const envelopeObj = {
      envelope_name: event.target.elements[0].value,
      current_amt: event.target.elements[1].value,
      fill_amt: event.target.elements[2].value,
    }

    const data = editingEnvelope 
      ? await BackendAPI.updateEnvelope(envelopeObj, props.envelope.id)
      : await BackendAPI.addEnvelope(envelopeObj)
    if (data) {
      window.location.reload()
    }

    // const copyEnvelopeArray = [...envelopeArray]

    // if (editingEnvelope) {
    //   copyEnvelopeArray.forEach((envelopeID) => {
    //     if (props.envelope.id == envelopeID) {
    //       BackendAPI.updateEnvelope(envelopeObj, props.envelope.id)
    //     }
    //   })
    // } else {

    //   const data = await BackendAPI.addEnvelope(envelopeObj)
    //   copyEnvelopeArray
    // }

    // setEnvelopeArray(copyEnvelopeArray)

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
          {action} Envelope
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              defaultValue={editingEnvelope && editingEnvelope.envelope_name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Current Balance</Form.Label>
            <Form.Control
              placeholder="Balance"
              defaultValue={editingEnvelope && editingEnvelope.current_amt}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fill Amount</Form.Label>
            <Form.Control
              placeholder="Fill Amount"
              defaultValue={editingEnvelope && editingEnvelope.fill_amt}
            />
          </Form.Group>

          <Button className='add-chore-btn' variant="primary" type="submit">
            {action} Envelope
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='generic-btn' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default AddEditEnvelope;