// react
import { useEffect, useState, useContext } from 'react'

// css
import Button from 'react-bootstrap/Button'

// api
import BackendAPI from '../api/BackendAPI'

// css
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap'

// components
import AddEditEnvelope from '../components/AddEditEnvelope';
import EnvelopeBar from '../components/EnvelopeBar';

// context
import EnvelopeArrayContext from '../context/EnvelopeArrayContext';


function SingleEnvelopePage({envelopeModal, setEnvelopeModal}) {
  // states
  const {envelopeArray, setEnvelopeArray} = useContext(EnvelopeArrayContext)

  // populates array of envelope objects
  useEffect(() => {
    const getEnvelopeArray = async() => {
      const data = await BackendAPI.fetchEnvelopes()
      if (data) {
        setEnvelopeArray(data)
      }
    }
    getEnvelopeArray()
  }, [])

  // helper functions
  // change envelope id to envelope name in table
  const displayEnvelopeName = (envelopeID) => {
    for (let i = 0; i < envelopeArray.length; i++) {
      if (envelopeArray[i].id == envelopeID) {
        return envelopeArray[i].envelope_name
      }
    }
  }

  const deleteEnvelope = async(envelopeID) => {
    const data = await BackendAPI.deleteEnvelope(envelopeID)
    const envelopeList = await BackendAPI.fetchEnvelopes()
    if (envelopeList) {
      setEnvelopeArray(envelopeList)
    }
  }

  return (
    <div className="container mt-4">
      <h1>Envelope Name</h1>
      <hr />
      <div>
        <EnvelopeBar envelope={envelope} envelopeModal={envelopeModal} setEnvelopeModal={setEnvelopeModal} />
      </div>
    </div>
  )
}

export default SingleEnvelopePage;