import { createContext, useContext } from "react";

//Objects
export const ThemeContext = createContext({
    themeMode: "light",
    //Functionality written in App.jsx
    darkTheme: () => {},
    lightTheme: () => {},
})

//Provider
export const ThemeProvider = ThemeContext.Provider

//hooks
export default function useTheme(){
    return useContext(ThemeContext)
}