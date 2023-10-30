import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import useAppProvider from './context/UseAppProvider'

function App() {
  const { username, handleLoginLogout } = useAppProvider()

  return (
    <div>
      {username ? (
        <Profile logout={handleLoginLogout} />
      ) :
        <Login loginAs={handleLoginLogout} />}
    </div>
  )
}

export default App