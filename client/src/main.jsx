import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import store from "./store/store.js";
import { init as initWebruit } from '@webruit/tracking'
import { config } from './lib/config'

if (config.webruit.projectKey && config.webruit.trackEndpoint) {
  initWebruit({
    projectKey: config.webruit.projectKey,
    endpoint: config.webruit.trackEndpoint,
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
