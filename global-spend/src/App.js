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
            <Route path="/envelope/" element={<EnvelopesPage />} />
            <Route path="/store/" element={<StoresPage />} />
          </Routes> 
          <RenderFooter />
        </BrowserRouter>
      </EnvelopeArrayContext.Provider>
    </div>
  );
}

export default App;
