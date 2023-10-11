import { createContext, useContext, useState } from "react";


const MessageContext = createContext();

const MessageState = ({children})=>{

    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([])

    return (
        <MessageContext.Provider value={{messages, setMessages, currentMessage, setCurrentMessage}}>
            {children}
        </MessageContext.Provider>
    )
}



export default MessageState

export const useMsg = ()=>useContext(MessageContext)