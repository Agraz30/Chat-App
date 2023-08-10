import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentuser,setcurrentuser] = useState({})

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
           setcurrentuser(user);   
           console.log(user); 
        });

        return ()=>{
           unsub();
        };
    },[]);
    
    return(
        <AuthContext.Provider value={{currentuser}}>
            {children}
        </AuthContext.Provider>
    )
}