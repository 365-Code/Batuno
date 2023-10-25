import React, { useEffect, useState } from 'react'
import logo from '/assets/batuno.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { forgotPasswordRoute } from '../utils/APIRoutes'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeState'
import { useAuth } from '../contexts/AuthState'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const {theme} = useTheme()
    const {auth, setAuth} = useAuth()

    const [cred, setCred]  = useState({
        username: '',
        secPin: undefined,
        password: '',
        cpassword: ''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCred({ ...cred, [name]: value })
    }


    useEffect(()=>{
        const data = localStorage.getItem('user')
        if(data){
            setAuth(JSON.parse(data))
            navigate('/')
        }
    }, [])


    const handleValidation = ()=>{
        const {username, secPin, password, cpassword} = cred
        if(!username || username.length < 3){
            toast.error("Invalid")
            return false
        }
        else if(!secPin || secPin.length !== 6 ){
            toast.error("Invalid Credentials")
            return false
        }
        else if(!password || !cpassword){
            toast.error("Password Required")
            return false
        }
        else if(password.length<8){
            toast.error("Enter Password of length 8 or more")
            return false
        }
        else if(!(password === cpassword)){
            toast.error("Password doesn't match")
            return false
        }

        return true
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if(handleValidation()){
            const {username, secPin, password} = cred
            const {data} = await axios.put(forgotPasswordRoute,{
                username, secPin, password
            })

            if(data.status){
                toast.success(data?.msg, {
                    delay: 1000
                })
                setTimeout(()=>{
                    navigate('/login')
                }, 2000)
            }
            else{
                toast.error(data?.msg);
            }
        }

    }


  return (
    <>
        <div id="forgot-password" 
        // className=' w-screen h-screen bg-[#e6ebf1] flex flex-col justify-center items-center  '>
        className={`w-screen h-screen ${theme.bodyBackground} flex flex-col justify-center items-center`}>

            <div 
            // className="register-box max-w-[90%] bg-[#e6ebf1] py-8 px-14 rounded-lg shadow-lg shadow-current border-slate-100 ">
            className={`register-box max-w-[90%] ${theme.outerBackground} py-8 px-14 rounded-lg shadow-lg shadow-current border-slate-100`}>

                <div className="brand flex flex-col items-center gap-1 ">
                    <div className ="brand-image">
                        <img src={logo} alt="batuno" 
                        className=' h-20 rounded-full ' />
                    </div>
                    <h1 className='text-2xl uppercase font-bold' >Batuno</h1>
                    <p className='font-semibold' >Make Connections</p>
                </div>

            <form onSubmit={handleSubmit}>

                <div className="input-group py-4 flex flex-col gap-4">

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='username' value={cred.username} onChange={handleChange} type="text" placeholder='username'  
                        className={`bg-transparent p-2 outline-none border-none ${theme.primaryTextColor} `} />
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='secPin' value={cred.secPin && cred.secPin} onChange={handleChange} type="number" maxLength={6} minLength={6} placeholder='security pin'  
                        className={`bg-transparent p-2 outline-none border-none ${theme.primaryTextColor} `} />
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='password' value={cred.password} onChange={handleChange} type="password" placeholder='new password'  
                        className={`bg-transparent p-2 outline-none border-none ${theme.primaryTextColor} `} />
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='cpassword' value={cred.cpassword} onChange={handleChange} type="password" placeholder='confirm new password'
                        className={`bg-transparent p-2 outline-none border-none ${theme.primaryTextColor} `} />
                    </div>
    
                </div>

                <div className="btn-group flex flex-col gap-2 text-center">
                    <button type='submit' className='p-2 rounded-lg font-semibold bg-[#50b5d3] hover:bg-[#93C6B7] '>Change Password</button>
                    <p>
                        <span>Already Registered? </span>
                        <Link to={'/login'}><span className='font-semibold text-violet-800 hover:underline cursor-pointer'>Login</span></Link>
                    </p>
                </div>

            </form>
            
            </div>

        </div>
        <ToastContainer/>
    </>
  )
}

export default ForgotPassword