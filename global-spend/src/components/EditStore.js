import { useNavigate, useParams } from "react-router-dom"
import { Form, Button, Modal } from "react-bootstrap"
import { useEffect, useState } from 'react'

// api
import BackendAPI from "../api/BackendAPI"

// component
import EnvelopeDropdown from "../components/EnvelopeDropdown"

function EditStore(props) {
  // router props
  const navigate = useNavigate()

  // states
  const [store, setStore] = useState(null)

  // effects
  useEffect (() => {
    const getStore = async () => {
      const data = await BackendAPI.fetchStoreByID(props.store.id) 
      setStore(data)
    }

    getStore()
  }, [] )

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const storeObj = {
      store_name: event.target.elements[0].value,
      store_longitude: event.target.elements[3].value,
      store_latitude: event.target.elements[2].value,
      amt_1: event.target.elements[4].value,
      amt_2: event.target.elements[5].value,
      amt_3: event.target.elements[6].value,
      amt_4: event.target.elements[7].value,
      envelope: [event.target.elements[1].value]
    }

    const data = await BackendAPI.updateStore(storeObj, props.store.id)
    if (data) {
      navigate(`/store/`)
      props.onHide()
    }
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
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="name" defaultValue={store && store.store_name} />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Envelope</Form.Label>
            <EnvelopeDropdown defaultValue={store && store.envelope}/>
            {/* <Form.Control placeholder="envelope" defaultValue={store && store.envelope} /> */}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Location: Latitude</Form.Label>
            <Form.Control placeholder="latitude" defaultValue={store && store.store_latitude} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location: Longitude</Form.Label>
            <Form.Control placeholder="longitude" defaultValue={store && store.store_longitude} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Typical Amount 1</Form.Label>
            <Form.Control placeholder="amt_1" defaultValue={store && store.amt_1} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Typical Amount 2</Form.Label>
            <Form.Control placeholder="amt_2" defaultValue={store && store.amt_2} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Typical Amount 3</Form.Label>
            <Form.Control placeholder="amt_3" defaultValue={store && store.amt_3} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Typical Amount 4</Form.Label>
            <Form.Control placeholder="amt_4" defaultValue={store && store.amt_4} />
          </Form.Group>

          <Button className='add-chore-btn' variant="primary" type="submit">
            Edit Store
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='generic-btn' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditStore;