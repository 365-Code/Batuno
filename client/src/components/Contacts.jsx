import React, { useState } from 'react'
import logo from '/assets/batuno.jpg'
import { useAuth } from '../contexts/AuthState'
import {IoMdLogOut} from 'react-icons/io'
import Logout from './Logout'
import { useTheme } from '../contexts/ThemeState'

const Contacts = ({contacts}) => {

    const {auth} = useAuth()
    const [selectedChat, setSelectedChat] = useState()
    const {setChatUser} = useAuth()
    const {theme} = useTheme()

  return (
    <>
        <div id="contacts" className={`flex flex-col gap-2 ${theme.primaryTextColor} sm:relative sm:w-1/4 w-[20%] `}>
        {/* <div id="contacts" className={`flex flex-col gap-2 ${theme.primaryTextColor} sm:relative sm:w-1/4 top-0 left-0 absolute w-[90%] h-full backdrop-blur-sm`}> */}

            <div className="brand h-[10%] flex gap-2 sm:justify-start justify-center items-center">
                    <img src={logo} alt="batuno" 
                    className='rounded-full h-2/3'/>
                    <h3 
                    className={`${theme.primaryTextColor} font-semibold hidden sm:hidden md:block`}>
                        Batuno</h3>
            </div>

            <div 
            // className={`current-user ${theme.innerBackground} rounded-lg h-[25%] flex flex-col gap-1 p-2 items-center justify-center`}>
            className={`current-user ${theme.innerBackground} rounded-lg h-[25%] flex flex-col gap-1 p-2 items-center justify-center`}>
                <img src={auth?.avatarImage} alt="user" 
                className='h-1/2 object-cover rounded-full'/>
                <h3 className='font-semibold text-center text-sm sm:text-lg'>{auth?.username} </h3>
            </div>

            <div 
            className=" user-contacts h-[65%] flex flex-col">
                <h3 
                className='sm:text-lg text-sm font-semibold'>Contacts</h3>
                <div 
                className="custom-scrollbar overflow-y-scroll flex flex-col gap-1 py-1">
                {
                    contacts.map((contact, index)=>{
                        return (
                            <div 
                            key={`chat${index}user`}
                            onClick={()=>{setChatUser(contact); setSelectedChat(index)}}
                            // className={`user-contact p-2 cursor-pointer rounded-xl flex items-center gap-2 hover:bg-[#DDE6ED] ${ index === selectedChat && "bg-[#DDE6ED]"}`}>
                            className={`user-contact p-2 cursor-pointer rounded-xl flex w-[95%] sm:justify-start justify-center items-center gap-2 hover:${theme.innerBackground} ${ index === selectedChat && theme.innerBackground}`}>
                                <img 
                                src={contact?.avatarImage} alt={contact?.username}
                                className='rounded-full h-10 ' />
                                <h3 
                                className='hidden sm:block'>{contact?.username}</h3>
                            </div>
                        )
                    })
                }
            </div>
            </div>

        </div>
    </>
  )
}

export default Contacts













































// import React, { useEffect, useState } from 'react'
// // import avatar from '../assets/avatar1.jpg'
// import avatar from '../assets/avatar2.jpg'

// const Contacts = ({contacts, setChat}) => {


//     const [currentUser, setCurrentUser] = useState(undefined)
//     useEffect(()=>{
//         if(localStorage.getItem('chat-user')){
//             setCurrentUser(JSON.parse(localStorage.getItem('chat-user')))
//         }
//     }, [])

//     const [selectedContact, setSelectedContact] = useState(undefined)


//     const changeCurrentChat = (index, contact)=>{
//         setSelectedContact(index)
//         setChat(contact)

//     }

//   return (
//     <>
//         <div id="contacts" className='sm:w-1/4 w-2/5  bg-[#131334] flex flex-col'>
//             <div className="brand uppercase flex gap-3 h-[15%] justify-center items-center">
//                 <img
//                     src="https://img.freepik.com/premium-vector/abstract-sphere-blue-water-logo-yin-yang-symbol-modern-vector-icon-sphere-with-splashes_177517-382.jpg?w=740" 
//                     alt="" 
//                     className=' rounded-full h-10'
//                     />
//                 <h1 className="text-white">Batuno</h1>
//             </div>
//             <div className="contacts h-[70%] flex flex-col gap-3 items-center overflow-y-scroll contact-scrollbar ">
//                 {
//                     contacts.map((contact, index)=>{
//                         return (
//                         <div key={`${index}${contact.username}`}
//                         onClick={()=>{changeCurrentChat(index, contact)}} 
//                         className={`contact rounded-md cursor-pointer transition-all hover:bg-[#9186b3] flex gap-3 h-16 px-3 items-center justify-start w-[90%] ${index === selectedContact? "bg-[#9186f3]" : ""}`}>
//                             <div className="avatar-image">
//                                 <img src={`${avatar}`} alt="" 
//                                 className=' h-10 rounded-full'/>
//                             </div>
//                             <div className="user-name text-white">
//                                 <h2 >{contact.username}</h2>
//                             </div>
//                         </div>
//                         )
//                     })
//                 }
//             </div>
//             <div className=" current-user h-[15%] flex items-center justify-center bg-[#0d0d30] cursor-pointer transition-all hover:bg-inherit gap-3">
//                 <div className="user-name text-white">
//                     <h2>{currentUser?.username}</h2>
//                 </div>
//                 <div className='avatar'>
//                     <img src={`${avatar}`} alt="" 
//                     className='object-cover h-12 rounded-full'/>
//                 </div>
//             </div>

//         </div>
//     </>
//   )
// }

// export default Contacts

