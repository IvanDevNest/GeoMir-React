import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es.json';
import { store } from './store'
import { Provider } from 'react-redux'
TimeAgo.addDefaultLocale(es);



ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>

<BrowserRouter>

<App />

</BrowserRouter>

</Provider>,
 document.getElementById('root')

)

