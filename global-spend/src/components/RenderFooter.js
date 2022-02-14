// react
import { useState } from 'react'

// icons
import { RiMailAddFill } from 'react-icons/ri'
import { MdAddBusiness } from 'react-icons/md'
import { BsCurrencyExchange } from 'react-icons/bs'

// css
import Button from 'react-bootstrap/Button'

// components
import AddEditEnvelope from './AddEditEnvelope'
import AddEditStore from './AddEditStore'
import Converter from './Converter'


function RenderFooter() {
  // states for modals
  const [envelopeModal, setEnvelopeModal] = useState(0)
  const [storeModal, setStoreModal] = useState(0)
  const [converterModal, setConverterModal] = useState(false)

  return(
    <div className="footer">
      <>
        <Button className='add-icon' variant="primary" onClick={() => setEnvelopeModal(true)}>
          <RiMailAddFill className="footer-icon"/> 
        </Button>
        <AddEditEnvelope envelope='false' show={envelopeModal} onHide={() => setEnvelopeModal(false)} />
      </>
      <>
        <Button className='add-icon' variant="primary" onClick={() => setStoreModal(true)}>
          <MdAddBusiness className="footer-icon"/> 
        </Button>
        <AddEditStore store='false' show={storeModal} onHide={() => setStoreModal(false)} />
      </>
      <>
        <Button className='add-icon' variant="primary" onClick={() => setConverterModal(true)}>
          <BsCurrencyExchange className="footer-icon"/> 
        </Button>
        <Converter show={converterModal} onHide={() => setConverterModal(false)} />
      </>
      
       
    </div>
  )
}

export default RenderFooter;