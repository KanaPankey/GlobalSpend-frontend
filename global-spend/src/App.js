// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// react
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import EnvelopesPage from './pages/EnvelopesPage';
import StoresPage from './pages/StoresPage';

// components
import RenderNavbar from './components/RenderNavbar';
import RenderFooter from './components/RenderFooter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RenderNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions/" element={<TransactionsPage />} />
          <Route path="/envelopes/" element={<EnvelopesPage />} />
          <Route path="/stores/" element={<StoresPage />} />
        </Routes> 
        <RenderFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
