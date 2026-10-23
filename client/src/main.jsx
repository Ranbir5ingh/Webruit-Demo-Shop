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

if (config.webruit.projectKey) {
  // endpoint is optional: @webruit/tracking defaults to the Webruit Cloud.
  // config only yields one when VITE_WEBRUIT_API_URL / VITE_WEBRUIT_DOMAIN
  // (or an explicit VITE_WEBRUIT_TRACK_ENDPOINT) is set — e.g. local dev.
  initWebruit({
    projectKey: config.webruit.projectKey,
    ...(config.webruit.trackEndpoint ? { endpoint: config.webruit.trackEndpoint } : {}),
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
