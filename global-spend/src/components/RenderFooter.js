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
import AddStore from './AddStore'
import Converter from './Converter'


function RenderFooter({envelopeModal, setEnvelopeModal, storeModal, setStoreModal, rate}) {
  // states for modals
  const [converterModal, setConverterModal] = useState(false)

  return(
    <div className="footer">
      <>
        <Button className='add-icon' variant="primary" onClick={() => setEnvelopeModal(true)}>
          <RiMailAddFill className="footer-icon"/> 
        </Button>
        <AddEditEnvelope show={envelopeModal} onHide={() => setEnvelopeModal(false)} />
      </>
      <>
        <Button className='add-icon' variant="primary" onClick={() => setStoreModal(true)}>
          <MdAddBusiness className="footer-icon"/> 
        </Button>
        <AddStore show={storeModal} onHide={() => setStoreModal(false)} />
      </>
      <>
        <Button className='add-icon' variant="primary" onClick={() => setConverterModal(true)}>
          <BsCurrencyExchange className="footer-icon"/> 
        </Button>
        <Converter rate={rate} show={converterModal} onHide={() => setConverterModal(false)} />
      </>
      
       
    </div>
  )
}

export default RenderFooter;