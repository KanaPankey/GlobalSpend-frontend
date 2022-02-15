// react
import { useState, useEffect } from 'react'

// css
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function Converter(props) {
  console.log("props in converter", props)
  // states
  const[price, setPrice] = useState(null)
  const[displayPrice, setDisplayPrice] = useState(0.00)

  // effects
  useEffect(() => {
    setDisplayPrice(parseFloat(price).toFixed(2))
  }, [price])
  
  // handlers
  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    // calculates the user inputted price to the price in dollars
    const priceInput = event.target[0].value
    let convertedPrice = priceInput * props.rate
    setPrice(convertedPrice)
  }
  
  const renderConvertedPrice = (price) => {
    return (
      <div>
        <h2>Price in $: { displayPrice == 'NaN' ? '' : displayPrice }</h2>
        <br />
        <h6>Conversion rate: {props.rate}</h6>
      </div>
    )
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
        <Button className='generic-btn' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Converter;