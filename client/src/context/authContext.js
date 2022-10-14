import { createContext, useEffect, useState } from "react";
import {instance }from '../config/axios.js';



export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const[currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null )

    const login = async(inputs) => {
        const res = await instance.post('auth/login', inputs)
        setCurrentUser(res.data)
    }

    const logout = async(inputs) => {
        const res = await instance.post('auth/logout')
        setCurrentUser(null);
    };

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser,login, logout}}>
        {children}
    </AuthContext.Provider>
}