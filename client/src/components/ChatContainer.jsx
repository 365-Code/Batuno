import React from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { useTheme } from '../contexts/ThemeState'
import { useAuth } from '../contexts/AuthState'
import Logout from './Logout'

const ChatContainer = () => {

  const {theme} = useTheme()
  const {chatUser} = useAuth()


  return (
    <>
        <div id="chat-container"
        // className='bg-[#f1f4fb] rounded-md w-[72%] p-4 flex flex-col justify-between'>
        className={`relative ${theme.innerBackground} rounded-md sm:w-[72%] w-[75%] py-4 sm:px-3 px-1 flex flex-col justify-between`}>
            <div 
            className={`absolute top-0 left-0 sm:hidden currentChat flex h-[10%] min-w-fit p-2 gap-2 items-center ${theme.secondaryTextColor} rounded-lg bg-white/60 backdrop-blur-sm`}>
                  <img src={chatUser?.avatarImage} alt="" 
                    className='h-8 rounded-full'/>
                <h3 className='font-semibold'>{chatUser?.username}</h3>
            </div>

            <Messages/>
            <ChatInput/>
        </div>

    </>
  )
}

export default ChatContainer