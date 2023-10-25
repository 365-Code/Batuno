import React, { useEffect, useState } from 'react'
import logo from '/assets/batuno.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthState'
import { useTheme } from '../contexts/ThemeState'

const Login = () => {

    const navigate = useNavigate()

    const [cred, setCred]  = useState({
        username: '',
        password: ''
    })

    const {setAuth} = useAuth()
    const {theme} = useTheme()

    useEffect(()=>{
      const data = localStorage.getItem('user')
      if(data){
        setAuth(JSON.parse(data))
        navigate('/')
      }
    }, [])


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCred({ ...cred, [name]: value })
    }

    const handleValidation = ()=>{
        const {username, email, password, cpassword} = cred
        if(!username){
            toast.error("Invalid Username")
            return false
        }
        else if(!password || password.length<8){
            toast.error("Enter a valid password")
            return false
        }

        return true
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if(handleValidation()){
            const {username, password} = cred
            const {data} = await axios.post(loginRoute,{
                username, password
            })

            if(data.status){
                toast.success("Logged in Successfully", {
                    draggable: true,
                    autoClose: 980
                })
                localStorage.setItem('user', JSON.stringify(data.user))
                setAuth(data.user);
                setTimeout(()=>{
                    data.user?.isAvatarImageSet
                    ?
                        navigate('/')
                    :
                        navigate('/setAvatar')
                }, 2000)
            }
            else{
                toast.error(data?.msg);
            }
        }

    }





  return (
    <>
        <div id="login" 
        // className=' w-screen h-screen bg-[#e6ebf1] flex flex-col justify-center items-center  '>
        className={`min-w-screen min-h-screen ${theme.bodyBackground} flex flex-col justify-center items-center`}>

            <div 
            // className="login-box max-w-[90%] bg-[#e6ebf1] py-8 px-14 rounded-xl shadow-md drop-shadow-2xl shadow-slate-500">
            className={`login-box max-w-[90%] ${theme.outerBackground} ${theme.primaryTextColor} py-4 px-8 sm:py-8 sm:px-14 rounded-xl border border-blue-500`}>

                <div className="brand flex flex-col items-center gap-1">
                    <div className ="brand-image">
                        <img src={logo} alt="batuno" 
                        className=' h-20 rounded-full'/>
                    </div>
                    <h1 className='text-2xl uppercase font-bold'>Batuno</h1>
                    <p className='font-semibold'>Make Connections</p>
                </div>

            <form onSubmit={handleSubmit}>

                <div className="input-group py-4 flex flex-col gap-4">

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='username' value={cred.username} onChange={handleChange} type="text" placeholder='username'  
                        className={` ${theme.primaryTextColor} w-full bg-transparent p-2 outline-none border-none`}/>
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='password' value={cred.password} onChange={handleChange} type="password" placeholder='password'  
                        className={`${theme.primaryTextColor} w-full bg-transparent p-2 outline-none border-none`}/>
                    </div>
    
                </div>

                <div className="btn-group flex flex-col gap-2 text-center">
                    <button type='submit' className='p-2 font-semibold rounded-lg bg-[#50b5d3] hover:bg-[#93C6B7] shadow-sm shadow-current '>Login</button>
                    <p>
                        <Link to={'/forgot-password'}><span className='font-semibold text-rose-800 hover:underline cursor-pointer ' >Forgot password?</span></Link>
                        <span> or </span>
                        <Link to={'/register'}><span className='font-semibold text-violet-800 hover:underline cursor-pointer ' >Sign up</span></Link>
                    </p>
                </div>

            </form>
            
            </div>

        </div>
        <ToastContainer/>
    </>
  )
}

export default Login







































// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'
// import { loginRoute } from '../utils/APIRoutes'




// const Login = () => {

//     const navigate = useNavigate()


//     const [cred, setCred] = useState({
//         username: '',
//         password: '',
//     });

//     const toastOptions = {
//         position: 'bottom-right',
//         autoClose: 3000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark"
//     }




//     const handleChange = (e)=>{
//         const {name, value} = e.target;
//         setCred({...cred, [name]:value})
//     }
    

//     const handleValidation = ()=>{
//         const {username, password} = cred;

//         if(!username.length){
//             toast.error("Password should be greater or equal to 8 chars", toastOptions)
//             return false
//         } else if(password<8){
//             toast.error("Password should be greater or equal to 8 chars", toastOptions)
//             return false
//         }

//         return true

//     }


//     useEffect(()=>{
//       if(localStorage.getItem('chat-user')){
//           navigate('/')
//         }
//     }, [])

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         if(handleValidation()){
//             const {username, password} = cred;
//             const {data} = await axios.post(loginRoute, {
//                 username,
//                 password
//             });

//             if(!data.status){
//                 toast.error(data.msg, toastOptions)
//             } 
            
//             if(data.status){
//                 localStorage.setItem('chat-user', JSON.stringify(data.user))
//                 toast.success("User Login")
//                 setTimeout(()=>{
//                     navigate('/')
//                 }, 1000)
//             }
//         }
//     }

//   return (
//     <>

//         <div id="login"
//         className='w-screen h-screen bg-[#131324] flex justify-center items-center'
//         >

//             <form 
//             className='text-center px-16 py-12 flex flex-col gap-5 bg-[#00000076] rounded-lg'
//             onSubmit={handleSubmit}
//             >

//                 <div 
//                 className="brand flex uppercase justify-center text-white items-center gap-3"
//                 >
//                     <img 
//                     src="https://img.freepik.com/premium-vector/abstract-sphere-blue-water-logo-yin-yang-symbol-modern-vector-icon-sphere-with-splashes_177517-382.jpg?w=740" 
//                     alt="logo" 
//                     className='rounded-full h-20'
//                     />
//                     <h1 className='text-2xl'>Batuno</h1>
//                 </div>

//                 <input className='w-full p-4 outline-none border text-white text-lg focus:border-[#997af0] border-[#4e0eff] rounded-md bg-transparent ' type="text" placeholder='Username' name='username' value={cred.username} onChange={handleChange} min={3}/>
//                 <input className='w-full p-4 outline-none border text-white text-lg focus:border-[#997af0] border-[#4e0eff] rounded-md bg-transparent ' type="password" placeholder='Password' name='password' value={cred.password} onChange={handleChange} />

//                 <button type='submit' className='bg-[#997af0] text-white py-4 px-8 font-semibold outline-none border-none cursor-pointer rounded-sm hover:bg-[#4e0eff] transition-all'>Login</button>
                
//                 <div className="links text-white uppercase">
//                     <p>New Registeration? <Link to={'/register'} className='text-violet-600'>Register</Link> </p>
//                 </div>

//             </form>

//         </div>
//         <ToastContainer/>

//     </>
//   )
// }

// export default Login