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

              <Route path='https://batuno.vercel.app/register' element={<Register />} />
              <Route path='https://batuno.vercel.app/login' element={<Login />} />
              <Route path='https://batuno.vercel.app/forgot-password' element={<ForgotPassword />} />
              <Route path='https://batuno.vercel.app/setAvatar' element={<SetAvatar />} />
              <Route path='https://batuno.vercel.app/' element={<Batuno />} />

            </Routes>
            </Theme>

          </MessageState>
        </AuthState>
      </ThemeState>
    </>
  )
}

export default App