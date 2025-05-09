import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import {AuthProvider} from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import { AuthProvider } from './context/AuthProvider';

//redux
import {Provider } from 'react-redux'
import store, {persistor} from './app/store'
import { PersistGate } from 'redux-persist/integration/react';

// import {persistor, store} from './app/store'

// const store = createStore({
//   authName:'_auth',
//   authType:'cookie',
//   cookieDomain: window.location.hostname,
//   cookieSecure: false
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
    {/* <AuthProvider  
      // authType={"cookie"}
      // authName={"_auth"}
      // cookieDomain={window.location.hostname}
      // cookieSecure={false}
      // tokenObject
      >   */}
      <Router>
        <App />
      </Router>
      </PersistGate>
    {/* </AuthProvider> */}
    </Provider>
  </React.StrictMode>
);
