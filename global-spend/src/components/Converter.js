// react
import { useState } from 'react'

// css
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function Converter(props) {
  // states
  const[price, setPrice] = useState(null)  // user inputted price converted and formatted based on exchange rate
  
  // handlers
  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    // converts the user inputted price to the price in dollars
    const priceInput = event.target[0].value
    let convertedPrice = priceInput * props.rate
    let displayPrice = parseFloat(convertedPrice).toFixed(2)
    setPrice(displayPrice)
  }
  
  const renderConvertedPrice = (price) => {
    return (
      <div>
        <h2>Price in $: { price == 'NaN' ? '' : price }</h2>
        <br />
        <h6>Conversion rate: {props.rate}</h6>
      </div>
    )
  }

  const resetOnClose = () => {
    setPrice(null)
    props.onHide()
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
          Converter
        </Modal.Title>
      </Modal.Header>

      { renderConvertedPrice(price) }

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
        <Button className='generic-btn' onClick={resetOnClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Converter;