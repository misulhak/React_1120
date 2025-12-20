import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './components/Header.css'; 
import "./pages/Home.css";
import './pages/Gallery.jsx';
import './pages/Contact.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)