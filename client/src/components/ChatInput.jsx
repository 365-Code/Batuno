import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import Picker from 'emoji-picker-react'
import { useMsg } from '../contexts/MessageState'
import axios from 'axios'
import { useAuth } from '../contexts/AuthState'
import { host, sendMessageRoute } from '../utils/APIRoutes'

import io from 'socket.io-client'
import { useTheme } from '../contexts/ThemeState'

const ChatInput = () => {

  const [isPicker, setIsPicker] = useState(false)
  const {auth, chatUser} = useAuth()
  const {currentMessage, setCurrentMessage, setMessages} = useMsg()
  const [receivedMessage, setReceivedMessage] = useState(null)
  const {theme} = useTheme()

  const socket = useRef();


  useEffect(()=>{
    const data = localStorage.getItem('user')
    if(auth || data){
      socket.current = io(host)
      socket.current?.emit("add-user", auth._id)
    }
  }, [])


  const toggleEmojiPicker = ()=>{
    setIsPicker(!isPicker)
  }

  const handleChange = (e)=>{
    setCurrentMessage(e.target.value)
  }

  const handleEmojiChange = (e)=>{
    setCurrentMessage(currentMessage+e.emoji)
  }

  const handleSendMessage = async (e)=>{
    e.preventDefault();

    if(currentMessage){
      await axios.post(sendMessageRoute, {
        from : auth?._id,
        to : chatUser?._id,
        message: currentMessage
      })

      socket.current?.emit('send-msg', {
        to: chatUser?._id,
        message: currentMessage
      }
      )
      setMessages((preVal)=>{return [...preVal, {msg: currentMessage, fromSelf: true}]})
      // setMessages((preVal)=>{return [...preVal, {msg: `${currentMessage} - ${chatUser.username}`, fromSelf: false}]})
      setCurrentMessage('')
    }
  }

  useEffect(()=>{
    socket.current?.on('msg-received', (receivedMessage)=>{
      setReceivedMessage({
        fromSelf:false, 
        msg: receivedMessage
      })
    })
  }, [])


  useEffect(()=>{
    if(receivedMessage){
      setMessages((preVal)=>{return [...preVal, receivedMessage]})
    } 
  }, [receivedMessage])
  


  return (
    // <div id='chat-input'
    // className='bg-[#FFFFFF] h-[14%] rounded-lg p-3'>

      <form onSubmit={handleSendMessage}>
          <div
          className='flex justify-between'>

            <div 
            // className="input-messages w-[80%] border flex items-center gap-2 rounded-xl">
            className={`input-messages w-[80%] border ${theme.border} focus:glow flex items-center gap-2 rounded-xl`}>

            <div className="relative emoji">

                <button type='button' onClick={toggleEmojiPicker}
                className='p-2'>😊</button>
                {
                  isPicker && 
                  <div className='absolute bottom-full'>
                    <Picker onEmojiClick={handleEmojiChange}/>
                  </div>
                }
              </div>

              <input onChange={handleChange} value={currentMessage} type="text" placeholder='Enter Your Message'
              className={`outline-none border-none w-full p-2 bg-transparent ${theme.primaryTextColor}`}/>

            </div>

            <button type='submit'
            className='bg-blue-500 hover:glow flex items-center px-4 rounded-xl outline-none'>
              <span className='hidden sm:inline-block'>Send</span>
              <IoMdSend/>
            </button>
              
          </div>
          </form>

    // </div>
  )
}

export default ChatInput















































// import React, { useEffect, useState } from 'react'
// import Picker, { Theme } from 'emoji-picker-react'
// import {IoMdSend} from 'react-icons/io'
// import {BsEmojiSmileFill} from 'react-icons/bs'

// const ChatInput = ({sendMessage}) => {

//     const [msg, setMsg] = useState('')
//     const [showEmoji, setShowEmoji] = useState(false)

//     const handleEmojiPicker = ()=>{
//         setShowEmoji(!showEmoji)
//     }

//     const handleChange = (e)=>{
//         setMsg(e.target.value)
//     }

//     const handleEmoji = (e)=>{
//         console.log(e)
//         let message = msg + e.emoji
//         setMsg(message)
//     }

//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         sendMessage(msg)
//         setMsg('')
//     }

    


//   return (
//     <>
//         <div className="px-8 chat-input h-[10%] bg-[#00000076] text-white flex justify-between items-center">
//             <div className="relative emoji-picker w-[5%] text-yellow-500 text-xl ">
//                 <BsEmojiSmileFill className='cursor-pointer' onClick={handleEmojiPicker} />
//                 {
//                     showEmoji && 
//                     <div className="absolute bottom-[100%]">
//                     <Picker theme='auto'  onEmojiClick={handleEmoji}/>
//                     </div>
//                 }
//             </div>

//             <form onSubmit={handleSubmit} className='w-full'>
//             <div className="input-container rounded-xl bg-[#9186f3] flex w-[95%]  ">
//                 <input type="text" value={msg} onChange={handleChange} className='bg-transparent w-full px-3 py-1 outline-none selection:bg-black' />
//                 <button type='submit' className='px-8 rounded-lg bg-[#131324] outline-none border-none'>
//                     <IoMdSend  />
//                 </button>
//             </div>
//             </form>
//         </div>

//     </>
//   )
// }

// export default ChatInput