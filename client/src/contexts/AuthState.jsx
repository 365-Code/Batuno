import { createContext, useContext, useState } from "react";



const AuthContext = createContext()

const AuthState = ({children})=>{
    const [auth, setAuth] = useState('');
    const [chatUser, setChatUser] = useState('')

    return (

        <AuthContext.Provider value={{auth, setAuth, chatUser, setChatUser}}>
            {children}
        </AuthContext.Provider>

    )
}


export default AuthState;


export const useAuth = ()=>useContext(AuthContext)