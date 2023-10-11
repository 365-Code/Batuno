import React, { useEffect, useState } from 'react'
import Contacts from '../components/Contacts'
import { useAuth } from '../contexts/AuthState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { contactRoute, getMessagesRoute } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import Messages from '../components/Messages';
import ChatContainer from '../components/ChatContainer';
import { useMsg } from '../contexts/MessageState';
import { useTheme } from '../contexts/ThemeState';
import Logout from '../components/Logout';

const Batuno = () => {

  const navigate = useNavigate()
  const [contacts, setContacts] = useState([]);
  const {auth, setAuth, chatUser, setChatUser} = useAuth();
  const {theme} = useTheme()

  useEffect(()=>{
    const data = localStorage.getItem('user');
    if(data){
      setAuth(JSON.parse(data))
    } else{
      navigate('/login')
    }
  }, [])

  useEffect(()=>{
    const getAllContacts = async ()=>{
      const {data} = await axios.get(`${contactRoute}/${auth._id}`)
      setContacts(data)
    }
    auth && getAllContacts()
  }, [auth])


  return (
    <>

        <div id="batuno"
        // className='bg-[#f7f8fc] w-screen h-screen flex items-center justify-center'>
        className={`${theme.bodyBackground} w-screen h-screen flex items-center justify-center`}>
          <div 
          // className="batuno-box w-[65%] h-[80%] p-6 flex bg-[#fefefe] border rounded-xl shadow-xl justify-between">
          className={`${theme.outerBackground} batuno-box w-[75%] h-[80%] py-6 px-4 flex border rounded-xl shadow-xl justify-between`}>
            <Contacts contacts={contacts} selectChat={setChatUser}/>
            {
              !chatUser ?
              <Welcome/>
              :
              
              <ChatContainer chatUser={chatUser} />
            }

          </div>

        </div>

    </>
  )
}

export default Batuno

































// import React, { useEffect, useRef, useState } from 'react'
// import Contacts from '../components/Contacts'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { allUserRoute, host } from '../utils/APIRoutes'
// import Welcome from '../components/Welcome'
// import ChatContainer from '../components/ChatContainer'

// import {io} from 'socket.io-client'

// const Batuno = () => {
  
//   const socket = useRef()
//   const navigate = useNavigate()
//   const [contacts, setContacts] = useState([])
//   const [currentUser, setCurrentUser] = useState(undefined)
//   const [currentChat, setCurrentChat] = useState(undefined);

//   useEffect(()=>{
//     if(currentUser){
//       socket.current = io(host);
//       socket.current.emit("add-user", currentUser._id)
//     }
//   }, [currentUser])
 
//   useEffect(()=>{
//     if(!localStorage.getItem('chat-user')){
//       navigate('/login')
//     }else{
//       setCurrentUser(JSON.parse(localStorage.getItem('chat-user')))
//     }
//   }, [])

//   useEffect(()=>{
//     const getContacts = async ()=>{
//       if(currentUser){
//         const {data} = await axios.get(`${allUserRoute}/${currentUser._id}`)
//           setContacts(data);
//       }
//     }

//     getContacts();

//   }, [currentUser])

//   return (
//     <>
//     {
//       currentUser &&
//       <div className='w-screen h-screen bg-[#131324] flex justify-center items-center'>
//         <div className="batuno w-[75vw] h-[75vh] bg-[#00000076] flex">
//           <Contacts contacts={contacts} setChat={setCurrentChat}/>
//           {
//             !currentChat ?
//               <Welcome currentUser={currentUser} />
//             :
            
//             <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>

//           }
//         </div>
//       </div>
//       }
//     </>
//   )
// }

// export default Batuno