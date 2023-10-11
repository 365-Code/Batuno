import React, { useEffect, useState } from 'react'
import { IoIosSwitch } from 'react-icons/io'
import { useTheme } from '../contexts/ThemeState'
import Logout from './Logout'
import { useAuth } from '../contexts/AuthState'

const Theme = ({children}) => {


    const {theme, setTheme, light, dark} = useTheme()


    const handleThemeChange = ()=>{
        theme.themeName === "light" ? 
        setTheme(dark) : 
        setTheme(light)
    }

    const [isLogged, setIsLogged] = useState(false)
    const {auth} = useAuth()
   
    useEffect(()=>{
      if(auth){
        setIsLogged(true)
      } else{
        setIsLogged(false)
      }
    }, [auth])


  return (
    <>
    <div 
    className={`theme-switch absolute flex items-center gap-4 right-10 top-5 cursor-pointer ${theme.themeName === "dark" ? "text-white" : "text-black" }`}>
      <span>Theme: {theme.themeName}</span>
      <div onClick={handleThemeChange}
      className='text-2xl'>
        <IoIosSwitch/>
      </div>
      { isLogged && <Logout/> }
    </div>
      {children}
    </>
  )
}

export default Theme