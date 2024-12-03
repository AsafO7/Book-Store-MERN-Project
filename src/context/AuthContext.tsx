import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { AuthParams } from "../utils/types";

const AuthContext =  createContext<AuthParams>({ currentUser: null, loading: false, registerUser: null, loginUser: null, signInWithGoogle: null, logout: null});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // register a user
    const registerUser = async (email: string, password: string) => {

        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login the user
    const loginUser = async (email: string, password: string) => {
    
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sing up with google
    const signInWithGoogle = async () => {
     
        return await signInWithPopup(auth, googleProvider)
    }

    // logout the user
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            // if(user) {
               
            //     const {email, displayName, photoURL} = user;
            //     const userData = {
            //         email, username: displayName, photo: photoURL
            //     } 
            // }
        })

        return () => unsubscribe();
    }, [])


    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}