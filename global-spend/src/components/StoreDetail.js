import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect, Fragment } from 'react'

import { FaTrash, FaEdit } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap'


// api
import BackendAPI from '../api/BackendAPI'

// components
import EditStore from './EditStore';


function StoreDetail(props) {
  // state for modal
  const [editStoreModal, setEditStoreModal] = useState(0)

  // helper functions
  const deleteStore = async(storeID) => {
    const data = await BackendAPI.deleteStore(storeID)
    const storeList = await BackendAPI.fetchStores()
    // if (storeList) {
    //   setStoreArray(storeList)
    // }
  }

  // render
  return (
    <div>
      <Row className='store-detail-row'>
        <Col>{props.store.store_name}</Col>
        <Col>{props.store.envelope}</Col>
        <Col>
          <>
            <Button className='edit-icon' variant="primary" onClick={() => setEditStoreModal(props.store.id)}>
              <FaEdit />
            </Button>
            <EditStore store={props.store} show={editStoreModal==props.store.id} onHide={() => setEditStoreModal(false)} />
          </>
          <Button className="delete-icon" onClick={() => deleteStore(props.store.id)} >
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default StoreDetail;