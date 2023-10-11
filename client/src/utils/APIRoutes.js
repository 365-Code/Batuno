import avatar1 from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import avatar4 from '../assets/avatar4.jpg'
import avatar5 from '../assets/avatar5.jpg'
import avatar6 from '../assets/avatar6.jpg'


export const host = "http://localhost:8080"
export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const forgotPasswordRoute = `${host}/api/auth/forgotPassword`
export const avatarRoute = `${host}/api/auth/set-avatar`

export const contactRoute = `${host}/api/auth/getAllUsers`

export const getMessagesRoute = `${host}/api/message/getMessages`
export const sendMessageRoute = `${host}/api/message/sendMessage`


export const avatars = [
    avatar1, avatar2, avatar3, avatar4
    ,avatar5, avatar6
]



























// export const host = "http://localhost:8080"
// export const registerRoute = `${host}/api/auth/register`
// export const loginRoute = `${host}/api/auth/login`
// export const allUserRoute = `${host}/api/auth/getAllUsers`
// export const sendMessageRoute = `${host}/api/message/sendMessage`
// export const getMessageRoute = `${host}/api/message/getMessages`