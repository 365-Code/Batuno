import React, { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeState'
import Logout from './Logout'
import { useAuth } from '../contexts/AuthState'

const Theme = ({children}) => {


    const {theme, setTheme, light, dark} = useTheme()


    const handleThemeChange = (e)=>{
      const thm = document.getElementById("thm")
      thm.style.transform = "rotate(180deg)"

      setTimeout(()=>{
        theme.themeName === "light" ? 
        setTheme(dark) : 
        setTheme(light)

        thm.style.transform = "none"

      }, 500)

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
    className={`theme-switch gap-2 absolute flex items-center right-10 top-5 cursor-pointer`}>
      <span className={`${theme.primaryTextColor} font-semibold tracking-wide `}>{theme.themeName} :</span>
      <div id='thm' onClick={handleThemeChange}
      className='transition-all text-center'>
        {
          theme.themeName == "light"
          ? <FaSun id='thm' color='orange'/>
          : <FaMoon id='thm' color='purple'/>
        }
      </div>
      { isLogged && <Logout/> }
    </div>
      {children}
    </>
  )
}

export default Theme