// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// react
import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import EnvelopesPage from './pages/EnvelopesPage';
import SingleEnvelopePage from './pages/SingleEnvelopePage'
import StoresPage from './pages/StoresPage';

// components
import RenderNavbar from './components/RenderNavbar';
import RenderFooter from './components/RenderFooter';

// api
import ConverterAPI from './api/ConverterAPI'

// context
import EnvelopeArrayContext from './context/EnvelopeArrayContext';
import StoreArrayContext from './context/StoreArrayContext';
import TransactionArrayContext from './context/TransactionArrayContext';


function App() {
  const [envelopeArray, setEnvelopeArray] = useState([])
  const [storeArray, setStoreArray] = useState([])
  const [transactionArray, setTransactionArray] = useState([])

  // states for modals
  const [envelopeModal, setEnvelopeModal] = useState(false)
  const [storeModal, setStoreModal] = useState(0)

  // states...home and spend rates are in relation to EUR
  const [homeRate, setHomeRate] = useState(null) 
  const [spendRate, setSpendRate] = useState(null) 
  const [relativeRate, setRelativeRate] = useState(null)  

  // get conversion rate
  // retrieve exchange rates compared to EUR from API
  useEffect(() => {
    const getConversionRate = async() => {
      const data = await ConverterAPI.fetchRates()
      if (data) {
        let getHomeRate = data.rates.USD
        setHomeRate(getHomeRate)
        let getSpendRate = data.rates.NOK
        setSpendRate(getSpendRate)
      }
    }
    // getConversionRate()  
  }, [])
  
  // calculate relative exchange rate between home and spend currencies through EUR
  useEffect(() => {
    let getRelativeRate = homeRate/spendRate
    console.log("getrelrate", getRelativeRate)
    setRelativeRate(getRelativeRate)
  }, [spendRate, homeRate])


  return (
    <div className="App">
      <EnvelopeArrayContext.Provider
        value={{
          envelopeArray: envelopeArray,
          setEnvelopeArray: setEnvelopeArray,
        }}>
        <StoreArrayContext.Provider 
          value={{
            storeArray: storeArray,
            setStoreArray: setStoreArray,
          }}>
          <TransactionArrayContext.Provider 
            value={{
              transactionArray: transactionArray,
              setTransactionArray: setTransactionArray,
            }}>
            <BrowserRouter>
              <RenderNavbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/transaction/" element={<TransactionsPage />} />
                <Route path="/envelope/" element={<EnvelopesPage envelopeModal={envelopeModal} setEnvelopeModal={setEnvelopeModal} />} />
                <Route exact path="/envelope/:envelopeID" element={<SingleEnvelopePage />} />
                <Route path="/store/" element={<StoresPage storeModal={storeModal} setStoreModal={setStoreModal} />} />
              </Routes> 
              <RenderFooter envelopeModal={envelopeModal} setEnvelopeModal={setEnvelopeModal} storeModal={storeModal} setStoreModal={setStoreModal} rate={relativeRate}/>
            </BrowserRouter>
          </TransactionArrayContext.Provider >
        </StoreArrayContext.Provider >
      </EnvelopeArrayContext.Provider>
    </div>
  );
}

export default App;
