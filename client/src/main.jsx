import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import store from "./store/store.js";
import { init as initWebruit } from '@webruit/tracking'

if (import.meta.env.VITE_WEBRUIT_PROJECT_KEY && import.meta.env.VITE_WEBRUIT_TRACK_ENDPOINT) {
  initWebruit({
    projectKey: import.meta.env.VITE_WEBRUIT_PROJECT_KEY,
    endpoint: import.meta.env.VITE_WEBRUIT_TRACK_ENDPOINT,
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    <Toaster className='z-500' />
    </Provider>
    </BrowserRouter>
    
  </StrictMode>,
)
