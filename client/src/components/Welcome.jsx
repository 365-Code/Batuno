import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthState'
import hello from '/assets/hello.gif'
import { useTheme } from '../contexts/ThemeState'

const Welcome = () => {
  const {auth} = useAuth()
  const {theme} = useTheme();

  return (
    <>
        <div id="welcome"
        // className='bg-[#DDE6ED] rounded-md w-[72%] p-4 flex flex-col justify-center items-center text-center'>
        className={`${theme.innerBackground} rounded-md sm:w-[72%] w-[75%] sm:px-3 px-1 flex flex-col justify-center items-center text-center`}>

          <img src={hello} alt="" className='h-[50%]'/>
          {/* <div className='text-center'> */}
          <h1 
          // className='text-3xl font-semibold'>
          className={`${theme.primaryTextColor} text-3xl font-semibold`}>
            Welcome 
            <span 
            // className='text-rose-600'>
            className={`${theme.secondaryTextColor}`}>
            {` ${auth?.username}`}</span> </h1>
          <h2 
          className={`${theme.primaryTextColor}`}>
            What's Up? Let's make new connections
            </h2>
          </div>

        {/* </div> */}

    </>
  )
}

export default Welcome

































// import React from 'react'

// const Welcome = ({currentUser}) => {
//   return (
//     <>
//     <div 
//     className="Welcome-screen text-white flex justify-center flex-col items-center w-[70%]">
//         <img 
//         className='h-[75%]'
//         src='https://o.remove.bg/downloads/0c216e79-8b1a-4659-926b-a4841e0637ee/cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195-removebg-preview.png'
//         alt="" />
//         <h1 className='text-3xl font-bold'>Welcome, <span className='text-purple-950'>{currentUser.username}</span> </h1> 
//         <h3 className='text2xl capitalize font-semibold'>Please select a chat to start messaging</h3>
//     </div>

//     </>
//   )
// }

// export default Welcome