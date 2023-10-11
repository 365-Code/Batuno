import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();


const ThemeState = ({children})=>{


    const light = {
        // #d6d6d6 #929292
        themeName: "light",
        primaryTextColor: "text-[#18223b]",
        secondaryTextColor: "text-[#6127ff]",
        bodyBackground: "bg-[#e4e9f9]",
        outerBackground: "bg-[#eff2f8]",
        innerBackground: "bg-[#d6e3fd]",
        userChatColor: "bg-[#1d90f5]",
        otherChatColor: "bg-[#fefefe]",
        innerBackgroundHover: "hover:bg-[#d6e3fd]",
        border: "border-[#1d90f5]"
    }
    
    const dark = {
        themeName: "dark",
        primaryTextColor: "text-[#ffffff]",
        secondaryTextColor: "text-[#6127ff]",
        bodyBackground: "bg-[#979da7]",
        outerBackground: "bg-[#272a37]",
        innerBackground: "bg-[#323644]",
        userChatColor: "bg-[#1d90f5]",
        otherChatColor: "bg-[#424656]",
        innerBackgroundHover: "hover:bg-[#323644]",
        border: "border-[#1d90f5]"
    }
    
    const [theme, setTheme] = useState(dark);

    return (

        <ThemeContext.Provider value={{theme, setTheme, light, dark}}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeState


export const useTheme = ()=>useContext(ThemeContext)