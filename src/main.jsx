import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es.json';
TimeAgo.addDefaultLocale(es);



ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
    </BrowserRouter>
)

