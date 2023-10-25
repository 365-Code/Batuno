import React from 'react'
import {IoMdLogOut} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthState'
import { useTheme } from '../contexts/ThemeState'


const Logout = () => {

    const navigate = useNavigate()
    const {setAuth, setChatUser} = useAuth()
    const {theme} = useTheme()

    const handleLogOut = ()=>{
        localStorage.clear()
        setChatUser('')
        toast.success("Logged Out Succesfully", {
            draggable: true,
            autoClose: 980,
        })
        
        setTimeout(()=>{
            setAuth('')
            navigate('/login')
        }, 2000)
    }

  return (
    <>
        <button
        onClick={handleLogOut} 
        // className='font-bold p-1 cursor-pointer rounded-full border hover:bg-white hover:text-black'>
        className={`transition-all p-1 cursor-pointer text-xl rounded-full ${theme.primaryTextColor} hover:glow hover:bg-blue-500 hover:text-slate-200`}>
            <IoMdLogOut/>
        </button>
        <ToastContainer/>
    </>
  )
}

export default Logout














































// import React from 'react'
// import {BiPowerOff} from 'react-icons/bi'
// import { useNavigate } from 'react-router-dom'



// const Logout = () => {

//     const navigate = useNavigate();

//     const handleClick = async ()=>{
//         localStorage.clear();
//         navigate('/login')
//     }


//   return (
//     <>
//         <button 
//         className='drop-shadow-lg rounded-xl bg-[#9186f3] hover:bg-[#4e0eff] flex justify-center items-center p-3'
//         onClick={handleClick}>
//             <BiPowerOff/>
//         </button>
//     </>
//   )
// }

// export default Logout