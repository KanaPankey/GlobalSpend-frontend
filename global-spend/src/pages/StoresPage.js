import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// css
import Button from 'react-bootstrap/Button'
import {Table} from 'react-bootstrap'

// api
import BackendAPI from '../api/BackendAPI'

// components
import StoreDetail from '../components/StoreDetail'


function StorePage(props) {
  // states
  const [storeArray, setStoreArray] = useState([])
  const [envelopeList, setEnvelopeList] = useState([])

  // effects
  useEffect(() => {
    const getstoreArray = async() => {
      const data = await BackendAPI.fetchStores()
      if (data) {
        setStoreArray(data)
      }
    }

    getstoreArray()
  }, [])

  useEffect(() => {
    const getEnvelopeList = async() => {
      const data = await BackendAPI.fetchEnvelopes()
      if (data) {
        setEnvelopeList(data)
      }
    }

    getEnvelopeList()
  }, [])

  // store id to name
  const displayEnvelopeName = (envelopeID) => {
    for (let i = 0; i < envelopeList.length; i++) {
      if (envelopeList[i].id == envelopeID) {
        return envelopeList[i].envelope_name
      }
    }
  }

  // // render helpers
  // const renderStoreArray = (storeArray) => {
  //   return (
  //     <>
  //     <h1>Inside render</h1>
  //       {storeArray.forEach((store, index) => {
  //         return <StoreDetail store={store} />
  //       })}
  //     </>
  //     // <Table striped bordered hover>
  //     //   <thead>
  //     //     <tr>
  //     //       <th>Store Name</th>
  //     //       <th>Envelope</th>
  //     //     </tr>
  //     //   </thead>
  //     //   <tbody>
  //     //   {storeArray.map((storeArray, index) => {
  //     //     return (
  //     //       <tr key={index}>
  //     //         <td><Link to={`/store/${storeArray.id}/`} style={{color:'black'}}>{storeArray.store_name}</Link></td>
  //     //         {console.log(storeArray.envelope)}
  //     //         <td>{displayEnvelopeName(storeArray.envelope)}</td>
  //     //       </tr>
  //     //     )
  //     //   })}
  //     //   </tbody>
  //     // </Table>
  //   )
  // }

  console.log("store array", storeArray)

  return (
    <div className="container mt-4">
      <h1>Store List</h1>
      <hr />
      {storeArray.map((store, index) => {
          return <StoreDetail store={store} storeModal={props.storeModal} setStoreModal={props.setStoreModal} />
      })}
    </div>
  )
}

export default StorePage;