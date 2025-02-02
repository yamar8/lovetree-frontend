import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import "./i18n.js"
import { GoogleOAuthProvider } from '@react-oauth/google';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
    <GoogleOAuthProvider clientId="540710081726-8bgpc95r7lqhsq3dibtmpa799cukl881.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>;
    </ShopContextProvider>
  </BrowserRouter>,
)
