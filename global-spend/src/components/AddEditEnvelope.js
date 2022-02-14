// react
import { useContext } from 'react'

// styling
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// context
import EnvelopeArrayContext from "../context/EnvelopeArrayContext"


function AddEditEnvelope(props) {
  // props needed: setEnvelopeList; if editing, envelope object

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

    // const copyEnvelopeArray = [...envelopeArray]

    // if (editingEnvelope) {
    //   copyEnvelopeArray.forEach((envelopeID) => {
    //     if (props.envelope.id == envelopeID) {
    //       await BackendAPI.updateEnvelope(envelopeObj, props.envelope.id)
    //     }
    //   })
    // } else {

    //   const data = await BackendAPI.addEnvelope(envelopeObj)
    //   copyEnvelopeArray
    // }

    // setEnvelopeArray(copyEnvelopeArray)


    // const data = editingEnvelope 
    //   ? await BackendAPI.updateEnvelope(envelopeObj, props.envelope.id)
    //   : await BackendAPI.addEnvelope(envelopeObj)
    // if (data) {
    //   setEnvelopeArray()
    // }
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