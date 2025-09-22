import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './pages/index/index.css';

// Monta la app
const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('No se encontró #root en el DOM');
}
