import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, SetCurrentUser] = useState({})

    useEffect(()=> {
        onAuthStateChanged(auth,(user) => {
            //this sets the current user
            SetCurrentUser(user)
            console.log(user)
        })
    }, []);
 return (
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
 )
    
}