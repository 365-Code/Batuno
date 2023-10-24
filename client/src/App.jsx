import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Batuno from './pages/Batuno'
import SetAvatar from './pages/SetAvatar'
import AuthState from './contexts/AuthState'
import MessageState from './contexts/MessageState'
import ThemeState from './contexts/ThemeState'
import Theme from './components/Theme'
import ForgotPassword from './pages/ForgotPassword'

const App = () => {
  return (
    <>
      <ThemeState>
        <AuthState>
          <MessageState>
            
            <Theme>
            <Routes>

              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/forgot-password' element={<ForgotPassword />} />
              <Route exact path='/setAvatar' element={<SetAvatar />} />
              <Route exact path='/' element={<Batuno />} />

            </Routes>
            </Theme>

          </MessageState>
        </AuthState>
      </ThemeState>
    </>
  )
}

export default App