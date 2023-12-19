"use client"

import { useState, useEffect, useContext, createContext } from 'react'
import { supabase } from '../components/Server/supabase'

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(false)
    const onAuthStateChange = async () => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            setUser(!!user);
        }   
    } catch (error) {
        console.log(error);
        } finally {}
    }

    useEffect(() => {
        onAuthStateChange();
    }, []);

    return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>    
    )
}

export const useAuthContext = () => useContext(AuthContext);