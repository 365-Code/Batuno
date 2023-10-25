import React, { useEffect, useState } from 'react'
import logo from '/assets/batuno.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeState'
import { useAuth } from '../contexts/AuthState'

const Register = () => {

    const navigate = useNavigate()
    const {theme} = useTheme()
    const {auth, setAuth} = useAuth()

    const [cred, setCred]  = useState({
        username: '',
        secPin: '',
        email: '',
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
        const {username, email, secPin, password, cpassword} = cred
        if(!username || username.length < 3){
            toast.error("Username should have atleast 3 characters")
            return false
        }
        else if(!email){
            toast.error("User Email Required")
            return false
        }
        else if(!secPin){
            toast.error("Security Pin Required")
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
            const {username, email, secPin, password} = cred
            const {data} = await axios.post(registerRoute,{
                username, email, secPin, password
            })

            if(data.status){
                toast.success("Registered Successfully", {
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
        <div id="register" 
        // className=' w-screen h-screen bg-[#e6ebf1] flex flex-col justify-center items-center  '>
        className={`w-screen h-screen ${theme.bodyBackground} flex flex-col justify-center items-center`}>

            <div 
            // className="register-box max-w-[90%] bg-[#e6ebf1] py-8 px-14 rounded-lg shadow-lg shadow-current border-slate-100 ">
            className={`register-box max-w-[90%] ${theme.outerBackground} py-4 px-8 sm:py-8 sm:px-14 rounded-lg shadow-lg shadow-current border-slate-100`}>

                <div className="brand flex flex-col items-center gap-1 ">
                    <div className ="brand-image">
                        <img src={logo} alt="batuno" 
                        className=' h-20 rounded-full ' />
                    </div>
                    <h1 className={`text-2xl uppercase font-bold ${theme.secondaryTextColor}`} >Batuno</h1>
                    <p className={`font-semibold ${theme.primaryTextColor} `} >Make Connections</p>
                </div>

            <form onSubmit={handleSubmit}>

                <div className="input-group py-4 flex flex-col gap-4">

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='username' value={cred.username} onChange={handleChange} type="text" placeholder='username'  
                        className={`w-full bg-transparent p-2 outline-none border-none ${theme.primaryTextColor}`} />
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='email' value={cred.email} onChange={handleChange} type="email" placeholder='email'  
                        className={`w-full bg-transparent p-2 outline-none border-none ${theme.primaryTextColor}`} />
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='secPin' value={cred.secPin}  onChange={handleChange} type="password" minLength={6} maxLength={6} placeholder='security pin'
                        className={`w-full bg-transparent p-2 outline-none border-none ${theme.primaryTextColor}`} />
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='password' value={cred.password} onChange={handleChange} type="password" placeholder='password'  
                        className={`w-full bg-transparent p-2 outline-none border-none ${theme.primaryTextColor}`} />
                    </div>

                    <div className="input-field shadow-inner shadow-current py-2 px-4  rounded-lg ">
                        <input name='cpassword' value={cred.cpassword} onChange={handleChange} type="password" placeholder='confirm password' 
                        className={`w-full bg-transparent p-2 outline-none border-none ${theme.primaryTextColor}`} />
                    </div>
    
                </div>

                <div className="btn-group flex flex-col gap-2 text-center">
                    <button type='submit' className={`p-2 rounded-lg tracking-wider bg-[#50b5d3] hover:bg-[#93C6B7] ${theme.primaryTextColor}`}>Register</button>
                    <p>
                        <span className={`${theme.primaryTextColor} font-light`}>Already Registered? </span>
                        <Link to={'/login'}><span className='text-violet-800 hover:underline cursor-pointer ' >Login</span></Link>
                    </p>
                </div>

            </form>
            
            </div>

        </div>
        <ToastContainer/>
    </>
  )
}

export default Register
































// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'
// import { registerRoute } from '../utils/APIRoutes'



// const Register = () => {

//     const navigate = useNavigate()


//     const [cred, setCred] = useState({
//         username: '',
//         email: '',
//         password: '',
//         cpassword: ''
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
//         const {username, email, password, cpassword} = cred;

//         if(username.length < 3){
//             toast.error("Username length should be greate than 3", toastOptions)
//             return false
//         } else if(!email){
//             toast.error("Enter Email",toastOptions )
//             return false
//         } else if(password<8){
//             toast.error("Password should be greater or equal to 8 chars", toastOptions)
//             return false
//         } else if(password !== cpassword){
//             toast.error("Password doesn't match", toastOptions)
//             return false
//         }
//         return true
//     }

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         if(handleValidation()){
//             const {username, email, password} = cred;
//             const {data} = await axios.post(registerRoute, {
//                 username,
//                 email,
//                 password
//             });

//             if(!data.status){
//                 toast.error(data.msg, toastOptions)
//             } 
            
//             if(data.status){
//                 localStorage.setItem('chat-user', JSON.stringify(data.user))
//                 toast.success("User Registered")
//                 setTimeout(()=>{
//                     navigate('/')
//                 }, 1000)
//             }
//         }
//     }


//     useEffect(()=>{
//         if(localStorage.getItem('chat-user'))
//           navigate('/')
//       }, [])



//   return (
//     <>

//         <div id="register"
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

//                 <input className='w-full p-4 outline-none border text-white text-lg focus:border-[#997af0] border-[#4e0eff] rounded-md bg-transparent ' type="text" placeholder='Username' name='username' value={cred.username} onChange={handleChange} />
//                 <input className='w-full p-4 outline-none border text-white text-lg focus:border-[#997af0] border-[#4e0eff] rounded-md bg-transparent ' type="email" placeholder='Email' name='email' value={cred.email} onChange={handleChange} />
//                 <input className='w-full p-4 outline-none border text-white text-lg focus:border-[#997af0] border-[#4e0eff] rounded-md bg-transparent ' type="password" placeholder='Password' name='password' value={cred.password} onChange={handleChange} />
//                 <input className='w-full p-4 outline-none border text-white text-lg focus:border-[#997af0] border-[#4e0eff] rounded-md bg-transparent ' type="password" placeholder='Confirm Password' name='cpassword' value={cred.cpassword} onChange={handleChange} />

//                 <button type='submit' className='bg-[#997af0] text-white py-4 px-8 font-semibold outline-none border-none cursor-pointer rounded-sm hover:bg-[#4e0eff] transition-all'>Register</button>
                
//                 <div className="links text-white uppercase">
//                     <p>Already Registered <Link to={'/login'} className='text-violet-600'>Login</Link> </p>
//                 </div>

//             </form>

//         </div>
//         <ToastContainer/>

//     </>
//   )
// }

// export default Register