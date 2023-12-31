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

              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/setAvatar' element={<SetAvatar />} />
              <Route path='/' element={<Batuno />} />

            </Routes>
            </Theme>

          </MessageState>
        </AuthState>
      </ThemeState>
    </>
  )
}

export default App