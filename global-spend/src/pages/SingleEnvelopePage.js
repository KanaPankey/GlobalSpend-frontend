// react
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// api
import BackendAPI from '../api/BackendAPI'

// components
import EnvelopeBar from '../components/EnvelopeBar';


function SingleEnvelopePage({envelopeModal, setEnvelopeModal}) {
  // states
  const [envelope, setEnvelope] = useState(null)

  const params = useParams()

  // populates array of envelope objects
  useEffect(() => {
    const getEnvelope = async() => {
      const data = await BackendAPI.fetchEnvelopeByID(params.id)
      if (data) {
        setEnvelope(data)
      }
    }
    getEnvelope()
  }, [])

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