import React, { useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthState'
import { useMsg } from '../contexts/MessageState';
import axios from 'axios';
import { getMessagesRoute } from '../utils/APIRoutes';
import { useTheme } from '../contexts/ThemeState';

const Messages = () => {

  const {auth, chatUser} = useAuth();
  const {messages, setMessages} = useMsg()
  const scrollRef = useRef();
  const {theme} = useTheme()


  useEffect(()=>{
    messages && scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])


  useEffect(()=>{

    const getMessages = async ()=>{

      const {data} = await axios.post(getMessagesRoute,{
        from: auth?._id,
        to: chatUser?._id
      })

      if(data){
        setMessages(data)
      }
    }

    chatUser && getMessages()

  }, [])


  return (
    <div id="message-container"
    className='flex flex-col gap-4 h-[82%] custom-scrollbar p-4 overflow-y-scroll'>
      {
        messages?.map((msg, index)=>{
          return (
              msg.fromSelf 
              ?
              <div ref={scrollRef} key={`chat${index}chat`} className="sended  flex gap-2 items-center justify-end">
                    {/* <div className='p-2 max-w-[55%] bg-[#1a2339] text-slate-50 text-sm rounded-lg'> */}
                    <div className={`p-2 max-w-[55%] ${theme.userChatColor} ${theme.primaryTextColor} text-sm rounded-lg rounded-tr-none`}>
                    <p className='break-words '>
                      {msg.msg}
                      </p>
                    </div>
                    <div className="img">
                      <img src={auth?.avatarImage} alt="" 
                      className='h-12 rounded-full'/>
                    </div>

              </div>
              :
              <div key={`chat${index}chat`} className="received flex items-center justify-start gap-2">
                    <div className="img">
                      <img src={chatUser?.avatarImage} alt="" 
                      className='h-12 rounded-full'/>
                    </div>
                    <div 
                    // className='p-2 max-w-[55%] bg-[#fefefe] text-[#1a2339] text-sm rounded-lg'>
                    className={`p-2 max-w-[55%] $ ${theme.otherChatColor} ${theme.primaryTextColor} text-sm rounded-lg rounded-tl-none`}>
                    <p className="break-words ">
                      {msg.msg}
                    </p>
                  </div>
              </div>
          )
        })
         
      }
    </div>
  )
}

export default Messages