// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// react
import { useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import EnvelopesPage from './pages/EnvelopesPage';
import StoresPage from './pages/StoresPage';

// components
import RenderNavbar from './components/RenderNavbar';
import RenderFooter from './components/RenderFooter';

// context
import EnvelopeArrayContext from './context/EnvelopeArrayContext';

function App() {
  const [envelopeArray, setEnvelopeArray] = useState([])

  // states for modals
  const [envelopeModal, setEnvelopeModal] = useState(0)
  const [storeModal, setStoreModal] = useState(0)

  return (
    <div className="App">
      <EnvelopeArrayContext.Provider
        value={{
          envelopeArray: envelopeArray,
          setEnvelopeArray: setEnvelopeArray,
        }}>
        <BrowserRouter>
          <RenderNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transaction/" element={<TransactionsPage />} />
            <Route path="/envelope/" element={<EnvelopesPage envelopeModal={envelopeModal} setEnvelopeModal={setEnvelopeModal} />} />
            <Route path="/store/" element={<StoresPage storeModal={storeModal} setStoreModal={setStoreModal} />} />
          </Routes> 
          <RenderFooter envelopeModal={envelopeModal} setEnvelopeModal={setEnvelopeModal} storeModal={storeModal} setStoreModal={setStoreModal} />
        </BrowserRouter>
      </EnvelopeArrayContext.Provider>
    </div>
  );
}

export default App;
