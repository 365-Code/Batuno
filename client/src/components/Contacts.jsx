import React, { useState } from 'react'
import logo from '/assets/batuno.jpg'
import { useAuth } from '../contexts/AuthState'
import {IoMdLogOut} from 'react-icons/io'
import Logout from './Logout'
import { useTheme } from '../contexts/ThemeState'

const Contacts = ({contacts, selectChat}) => {

    const {auth} = useAuth()
    const [selectedChat, setSelectedChat] = useState()
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
                    contacts?.map((contact, index)=>{
                        return (
                            <div 
                            key={`chat${index}user`}
                            onClick={()=>{selectChat(contact); setSelectedChat(index)}}
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