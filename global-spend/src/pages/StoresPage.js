// react
import { useEffect, useState } from 'react'

// css
import Button from 'react-bootstrap/Button'

// api
import BackendAPI from '../api/BackendAPI'

// css
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap'

// components
import EditStore from '../components/EditStore';


function StorePage(props) {
  // states
  const [storeArray, setStoreArray] = useState([])
  const [envelopeArray, setEnvelopeArray] = useState([])
  const [editStoreModal, setEditStoreModal] = useState(0)

  // populates array of store objects
  useEffect(() => {
    const getstoreArray = async() => {
      const data = await BackendAPI.fetchStores()
      if (data) {
        setStoreArray(data)
      }
    }
    getstoreArray()
  }, [])

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

  const deleteStore = async(storeID) => {
    // How do I know that deleteStore will happen before fetchStores???
    const data = await BackendAPI.deleteStore(storeID)
    const storeList = await BackendAPI.fetchStores()
    if (storeList) {
      setStoreArray(storeList)
    }
  }

  return (
    <div className="container mt-4">
      <h1>Stores</h1>
      <hr />
      {storeArray.map((store, index) => {
          return (
            <div key={index}>
              <Row className='store-detail-row'>
                <Col sm={2}>{store.store_name}</Col>
                <Col sm={3}>{displayEnvelopeName(store.envelope)}</Col>
                <Col sm={1}>{store.amt_1}</Col>
                <Col sm={1}>{store.amt_2}</Col>
                <Col sm={1}>{store.amt_3}</Col>
                <Col sm={1}>{store.amt_4}</Col>
                <Col>
                  <>
                    <Button className='edit-icon' variant="primary" onClick={() => setEditStoreModal(store.id)}>
                      <FaEdit />
                    </Button>
                    <EditStore storeArray={storeArray} setStoreArray={setStoreArray} store={store} show={editStoreModal==store.id} onHide={() => setEditStoreModal(false)} />
                  </>{' '}
                  <Button className="delete-icon" onClick={() => deleteStore(store.id)} >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
              <hr />
            </div>
          )
      })}
    </div>
  )
}

export default StorePage;