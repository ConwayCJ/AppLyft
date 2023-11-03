import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/index.css'
import { AppProvider } from '../src/context/AppProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
)

