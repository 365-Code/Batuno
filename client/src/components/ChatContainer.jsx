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







































// import React, { useEffect, useRef, useState } from 'react'
// import avatar from '../assets/avatar1.jpg'
// import Logout from './Logout'
// import ChatInput from './ChatInput'
// import Messages from './Messages'
// import { getMessageRoute, host, sendMessageRoute } from '../utils/APIRoutes'
// import axios from 'axios'

// const ChatContainer = ({ currentChat, currentUser, socket }) => {

//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState('')
//   const scrollRef = useRef();

  
//   useEffect(()=>{
//     const getMessages = async ()=>{
//       const response = await axios.post(getMessageRoute, {
//         from: currentUser._id,
//         to: currentChat._id
//       })
//       setMessages(response.data)
//     }
//     currentChat && getMessages();
//   }, [currentChat])

//   const handleSendMsg = async (msg)=>{
//     await axios.post(sendMessageRoute,{
//       from: currentUser._id,
//       to: currentChat._id,
//       message: msg
//     })

//     socket.current.emit("send-msg", {
//       from: currentUser._id,
//       to: currentChat._id,
//       message: msg
//     })

//     setMessages([...messages, {fromSelf: true, msg: msg}])    

//   } 

//   useEffect(()=>{
//     if(socket.current){
//       socket.current.on("msg-received", msg=>{
//         setMessage({fromSelf: false, msg})
//       })
//     }
//   }, [])


//   useEffect(()=>{
//     message && setMessages([...messages, message])
//   }, [message])

//   useEffect(()=>{
//     messages && scrollRef.current?.scrollIntoView({behavior: "smooth", })
//     console.log(messages)
//     console.log("Scroll")
// }, [messages])


//   return (
//     <>
//       {
//         currentChat &&
//         <>
//           <div className='w-[75%] flex flex-col'>
//             <div className=" h-[15%] px-8 chat-header flex justify-between items-center  py-3 ">
//               <div className="user-details flex gap-4 items-center text-white">
//                 <div className="avatar">
//                   <img
//                     className='h-12 rounded-full'
//                     src={avatar}
//                     alt="" />
//                 </div>
//                 <h1>{currentChat.username}</h1>
//               </div>
//               <Logout />
//             </div>
//             <div  className="message-container contact-scrollbar flex flex-col gap-4 overflow-auto px-8 py-2 h-[75%] text-white">
//               {
//                 messages.map((msg, index)=>{
//                   return (
//                       <div key={index} ref={scrollRef} className={`flex items-center message ${msg.fromSelf ? "sended" : "received"}`}>
//                         <div className="content p-2 rounded-xl break-words max-w-[40%] text-[#d1d1d1]">
//                           <p>
//                             {msg.msg}
//                           </p>
//                         </div> 
//                       </div>
//                   )
//                 })
//               }
//             </div>
//             {/* <Messages /> */}
//             <ChatInput sendMessage={handleSendMsg} />
//           </div>
//         </>
//       }
//     </>
//   )
// }

// export default ChatContainer