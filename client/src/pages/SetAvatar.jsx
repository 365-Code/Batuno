import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthState';

import { avatarRoute, avatars } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeState';

const SetAvatar = () => {

  const navigate = useNavigate()
  const {auth, setAuth} = useAuth();
  const [selected, setSelected] = useState(null)
  const {theme} = useTheme()
  // const avatars = [avatar1, avatar2, avatar1, avatar2, avatar1, avatar2, avatar1, avatar2, avatar1, avatar2]

  useEffect(()=>{
    const data = localStorage.getItem('user')
    if(data){
      setAuth(JSON.parse(data))
    }
  }, [])

  const handleSelect = (index)=>{
    setSelected(index)
  }

  const handleSubmit = async (e)=>{
    if(selected){
      const avatar = avatars[selected]
      const {data} = await axios.put(`${avatarRoute}/${auth._id}`,{
        avatar
      })
      
      if(data?.status){
        toast.success("Avatar Updated", {draggable:true, autoClose: 1000})
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth(data.user)
        setTimeout(()=>[
          navigate('/')
        ], 1000)
      }
    }
  }


  return (
    <>

        <div id="set-avatar"
        // className='h-screen w-screen bg-[#EBE6E6] flex flex-col justify-center items-center '>
        className={`h-screen w-screen ${theme.bodyBackground} ${theme.primaryTextColor} flex flex-col justify-center items-center`}>

            <div 
            // className="avatar-box bg-[#F0F0F0] rounded-xl drop-shadow-lg p-12 text-center flex flex-col gap-3">
            className={`avatar-box ${theme.outerBackground} rounded-xl drop-shadow-lg p-12 text-center flex flex-col gap-3`}>
              
              <h1 className='text-2xl font-semibold' >Pick an avatar and Connect with others</h1>
              <h3 className='text-sm font-semibold'>Choose Your Favourite Avatar</h3>

              <div 
              // className="avatars bg-[#E0E0E0] px-8 py-4 grid grid-cols-4 gap-4 h-32 overflow-y-scroll custom-scrollbar">
              className={`avatars ${theme.innerBackground} px-8 py-4 grid grid-cols-4 gap-4 h-32 overflow-y-scroll custom-scrollbar`}>
                {
                  avatars.map( (avatar, index)=>{
                    return (
                      <div key={`ava${index}tar`} 
                      onClick={()=>{handleSelect(index)}}
                      className={`avatar rounded-full h-20 w-20  hover:border-[4px] ${index === selected && "border-[4px]"}   border-spacing-4 border-blue-600 cursor-pointer`}>
                        <img src={avatar} alt={avatar} 
                        className=' rounded-full '/>
                      </div>
                      )
                  } )
                }
              </div>
                <div className="btn-group flex justify-end gap-4 py-2">
                  <button className='p-2 cursor-pointer font-light ' onClick={()=>{navigate('/')}}>skip</button>
                  <button type='submit' className='p-2 cursor-pointer bg-violet-700 text-white font-semibold rounded-sm  ' onClick={handleSubmit} >Continue</button>
                </div>

            </div>

        </div>
        <ToastContainer/>

    </>
  )
}

export default SetAvatar









































// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'
// import { Buffer } from 'buffer'

// const SetAvatar = () => {

//     const api = "https://api.multiavatar.com/45678945"

    
//     const toastOptions = {
//       position: 'bottom-right',
//       autoClose: 3000,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "dark"
//   }

//     const [avatars, setAvatars ] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [selectedAvatar, setSelectedAvatar] = useState(undefined)

//     // const setProfile = async ()=>{}

//     useEffect( async ()=>{
//         const data = [];
//         for(let i=0; i<4; i++){
//             const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
//             const buffer = new Buffer(image.data)
//             data.push(buffer.toString("base64"))
//         };
//         setAvatars(data);
//         setIsLoading(false)
//     },[])


//   return (
//     <>
//         <div className="bg-[#4eoeff]" id="Avatar">
//           <div>
//             <div className="avatar-heading">
//               <h1>Pick an avatar as your profile picture</h1>
//             </div>
//             <div className="avatars">
//               {avatars.map((avatar, index)=>{
//                 return (
//                   <div key={index}
//                     className={`avatar ${selectedAvatar === index ? "selected" : "" }`}>
//                     <img src={`data;image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)} />

//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//         </div>
//         <ToastContainer/>
//     </>
//   )
// }

// export default SetAvatar