// css
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function Converter(props) {
  // handlers
  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    // calculates the user inputted price to the price in dollars
    const priceInput = event.target[0].value
    // let convertedPrice = priceInput * props.rate
    // setPrice(convertedPrice)
  }

  return ( 
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Converter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>NOK</Form.Label>
            <Form.Control
              placeholder="Price in NOK"
            />
          </Form.Group>

          <Button className='add-chore-btn' variant="primary" type="submit">
            Convert
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='generic-btn' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Converter;