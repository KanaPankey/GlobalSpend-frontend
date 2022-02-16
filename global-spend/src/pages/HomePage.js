// react
import { useNavigate } from "react-router-dom"
import { Form, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"

// API
import BackendAPI from "../api/BackendAPI"

// components
import EnvelopeDropdown from "../components/EnvelopeDropdown"
import StoreDropdown from "../components/StoreDropdown"
import IsDebitDropdown from "../components/IsDebitDropdown"

// context
import StoreArrayContext from "../context/StoreArrayContext"


function HomePage(props) {
  return (
    <>
      <h1>Home Page</h1>
    </>
  )
//   const {storeArray, setStoreArray} = useContext(StoreArrayContext)
//   const [userPosition, setUserPosition] = useState([])
//   const [userStore, setUserStore] = useState(null)

//   // get user's current position
//   useEffect(() => {
//     if (window.navigator.geolocation) {
//       const success = (position) => {
//         const data = position
//         setUserPosition([data.coords.latitude, data.coords.longitude])
//       }
      
//       const error = (error) => {
//         console.log(error)
//       }
      
//       window.navigator.geolocation.getCurrentPosition(success, error)
//     }
//   }, [])
  

//   // get lat and long from each store and compare to userlocation
//   // sets user store to store closest to user current position if it's within a given radius
//   useEffect(() => {
//     const distanceList = []
//     for (let i = 0; i < storeArray.length; i++) {
//       // pull in user latlong and store instance latlong
//       let userLat = userPosition[0]
//       let userLong = userPosition[1]
//       let storeLat = storeArray[i].store_latitude
//       let storeLong = storeArray[i].store_longitude

//       // Haversine distance equation to find distance as crow flies between two latlongs
//       const R = 6371000;  // Radius of the Earth in meters
//       let rUserLat = userLat * (Math.PI/180.0)  // Convert degrees to radians
//       let rStoreLat = storeLat * (Math.PI/180.0)  // Convert degrees to radians
//       let rUserLong = userLong * (Math.PI/180.0)  // Convert degrees to radians
//       let rStoreLong = storeLong * (Math.PI/180.0)  // Convert degrees to radians
//       let diffLat = rStoreLat - rUserLat  // Radian difference (latitudes)
//       let diffLong = rStoreLong - rUserLong  // Radian difference (longitudes)

//       let a = Math.sin(diffLat/2.0)**2 + Math.cos(storeLat) * Math.cos(userLat) * Math.sin(diffLong/2.0)**2

//       let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

//       let distanceKM = (R * c)/1000.0
//       let distance = distanceKM.toFixed(3)

//       // creates an array with store id and the distance from the user
//       distanceList.push([storeArray[i], distance])
//     }

//     // determine if there are any stores in a given radius and, if so, which is closest
//     let radius = 0.3 // in km
//     let distClosestStore = radius // any store must be closer than the radius distance from user location to count
//     let ClosestStoreObj = null
    
//     // check if store is closer than previous ones
//     for (let i = 0; i < distanceList.length; i++) {
//       if (distanceList[i][1] < distClosestStore) {
//         distClosestStore = distanceList[i][1]
//         ClosestStoreObj = distanceList[i][0]
//       }
//     }

//     // if closest store is closer than maximum radius
//     if (distClosestStore < radius) {
//       setUserStore(ClosestStoreObj)
//     } 
    
//   }, [storeArray, userPosition])











//   // router props
//   const navigate = useNavigate()

//   const spendAmt = null

//   // handlers
//   const handleFormSubmit = async (event) => {
//     event.preventDefault()

//     const promiseArray = []

//     // get date to populate transaction
//     let today = new Date();
    
//     // set amount spent in home currency
//     let spentInHomeCurrency = event.target.elements[0].value * props.rate
//     let homeAmt = parseFloat(spentInHomeCurrency).toFixed(2)

//     // values used by new transaction obj and envelope
//     let envelopeID = parseInt(event.target.elements[2].value)
//     let isDebit = event.target.elements[1].value

//     const transactionObj = {
//       transaction_date: today,
//       original_transaction_amt: event.target.elements[0].value,
//       home_transaction_amt: homeAmt,
//       is_debit_transaction: isDebit,
//       envelope: envelopeID,
//       store: event.target.elements[3].value,
//       notes: event.target.elements[4].value
//     }
    
//     // create transaction record
//     promiseArray.push(await BackendAPI.addTransaction(transactionObj))
    
//     // change current amt for the envelope of transaction accounting for debit/deposit
//     const envelope = await BackendAPI.fetchEnvelopeByID(envelopeID)
//     let newCurrentAmt 
//     if (envelope) {
//       let envelopeCurrentAmt = envelope.current_amt
//       if (isDebit) {
//         newCurrentAmt = envelopeCurrentAmt - homeAmt
//       } else {
//         newCurrentAmt = envelopeCurrentAmt + homeAmt
//       }
      
//       // update envelope
//       const envelopeObj = {
//         current_amt: newCurrentAmt
//       }
//       promiseArray.push(await BackendAPI.updateEnvelope(envelopeObj, envelopeID))

//       // wait for both backend calls to complete
//       Promise.all(promiseArray).then(values => {
//         navigate(`/transaction/`)
//       })
//     }
//   }

//   // changes spend amount 
//   const setSpendAmount = (event) => {
//     let amtSpent = document.getElementById('amtSpent')
//     let spendAmt = event.target.firstChild.data
//     amtSpent.value = spendAmt
//   }

//   // helpers for TypicalAmtTitles render function
//   let amt1 = props.userStore && props.userStore.amt_1
//   let amt2 = props.userStore && props.userStore.amt_2
//   let amt3 = props.userStore && props.userStore.amt_3
//   let amt4 = props.userStore && props.userStore.amt_4


//   // render helpers
//   const TypicalAmtTiles = (props) => {
//     if (amt1) {
//       return(
//         <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
//           <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
//             <Button variant="secondary">{amt1}</Button>{' '}
//           </ButtonGroup>
//           <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
//             <Button variant="secondary">{amt2}</Button>{' '}
//           </ButtonGroup>
//           <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
//             <Button variant="secondary">{amt3}</Button>{' '}
//           </ButtonGroup>
//           <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
//             <Button variant="secondary">{amt4}</Button>{' '}
//           </ButtonGroup>
//         </ButtonToolbar>
//       )
//     } else {
//       return ''
// }
//   }

//   // render
//   return (
//     <div className="container mt-4">
//       <hr />
//       <TypicalAmtTiles />
//       <hr />
//       <Form onSubmit={handleFormSubmit}>
//         <Form.Group>
//           <Form.Label>Spent in local currency</Form.Label>
//           <Form.Control id="amtSpent" placeholder="amt in local" defaultValue={spendAmt}/>
//         </Form.Group>
//         <br />
//         <Form.Group>
//           <Form.Label>Debit or deposit</Form.Label>
//           <div><IsDebitDropdown defaultValue={true}/></div>
//         </Form.Group>
//         <br />
//         <Form.Group>
//           <Form.Label>Envelope</Form.Label>
//           <div><EnvelopeDropdown defaultValue={props.userStore && props.userStore.envelope}/></div>
//         </Form.Group>
//         <br />
//         <Form.Group>
//           <Form.Label>Store</Form.Label>
//           <div><StoreDropdown defaultValue={props.userStore && props.userStore.id}/></div>
//         </Form.Group>
//         <br />
//         <Form.Group>
//           <Form.Label>Notes</Form.Label>
//           <Form.Control placeholder="notes" />
//         </Form.Group>

//         <br />
//         <div className="text-center">
//           <Button variant="success" type="submit">
//             Add Transaction
//           </Button>  
//         </div>
//       </Form>  
//     </div>
//   )
}

export default HomePage;