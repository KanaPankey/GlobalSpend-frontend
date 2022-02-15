// react
import { Link } from 'react-router-dom'
import { useContext } from 'react'

// api
import BackendAPI from '../api/BackendAPI'

// css
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Row, Col, Button } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'

// context
import EnvelopeArrayContext from '../context/EnvelopeArrayContext';

// components
import AddEditEnvelope from './AddEditEnvelope';


function EnvelopeBar({envelope, envelopeModal, setEnvelopeModal}) {
  console.log("envelopebar props", envelope)
  // states
  const {envelopeArray, setEnvelopeArray} = useContext(EnvelopeArrayContext)

  const deleteEnvelope = async(envelopeID) => {
    const data = await BackendAPI.deleteEnvelope(envelopeID)
    const envelopeList = await BackendAPI.fetchEnvelopes()
    if (envelopeList) {
      setEnvelopeArray(envelopeList)
    }
  }

  // displayed on progress bar
  const progressBarFill = envelope.current_amt/envelope.fill_amt*100

  return (
    <div>
      <Row>
        <Col><Link to={`/envelope/${envelope.id}/`} style={{color:'black'}}>{envelope.envelope_name}</Link></Col>
        <Col><ProgressBar variant="success" now={ progressBarFill } /></Col>
        <Col>$ {Math.round(envelope.current_amt)}/{Math.round(envelope.fill_amt)}</Col>
        <Col>
          <>
            <Button className='edit-icon' variant="primary" onClick={() => setEnvelopeModal(envelope.id)}>
              <FaEdit />
            </Button>
            <AddEditEnvelope envelope={envelope} show={envelopeModal==envelope.id} onHide={() => setEnvelopeModal(false)} />
          </>{' '}
          <Button className="delete-icon" onClick={() => deleteEnvelope(envelope.id)} >
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default EnvelopeBar;