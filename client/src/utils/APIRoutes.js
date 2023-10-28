import avatar1 from '/assets/avatar1.jpg'
import avatar2 from '/assets/avatar2.jpg'
import avatar3 from '/assets/avatar3.jpg'
import avatar4 from '/assets/avatar4.jpg'
import avatar5 from '/assets/avatar5.jpg'
import avatar6 from '/assets/avatar6.jpg'
import avatar7 from '/assets/avatar7.png'
import avatar8 from '/assets/avatar8.png'
import avatar9 from '/assets/avatar9.png'
import avatar10 from '/assets/avatar10.png'
import avatar11 from '/assets/avatar11.png'
import avatar12 from '/assets/avatar12.png'
import avatar13 from '/assets/avatar13.png'
import avatar14 from '/assets/avatar14.png'
import avatar15 from '/assets/avatar15.png'
import avatar16 from '/assets/avatar16.png'
import avatar17 from '/assets/avatar17.png'
import avatar18 from '/assets/avatar18.png'

export const host = import.meta.env.VITE_REACT_APP_API
console.log(host)
export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const forgotPasswordRoute = `${host}/api/auth/forgotPassword`
export const avatarRoute = `${host}/api/auth/set-avatar`

export const contactRoute = `${host}/api/auth/getAllUsers`

export const getMessagesRoute = `${host}/api/message/getMessages`
export const sendMessageRoute = `${host}/api/message/sendMessage`


export const avatars = [
    avatar1, avatar2, avatar3, avatar4 ,avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18
]



























// export const host = "http://localhost:8080"
// export const registerRoute = `${host}/api/auth/register`
// export const loginRoute = `${host}/api/auth/login`
// export const allUserRoute = `${host}/api/auth/getAllUsers`
// export const sendMessageRoute = `${host}/api/message/sendMessage`
// export const getMessageRoute = `${host}/api/message/getMessages`