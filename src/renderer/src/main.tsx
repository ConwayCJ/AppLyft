import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/index.css'
import { AppProvider } from '../src/context/AppProvider'
import { TimerProvider } from "@renderer/context/TimerProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <TimerProvider>
      <App />
    </TimerProvider>
  </AppProvider>
)

