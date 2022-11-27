import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Firebase/Firebase.config'
import { useEffect } from 'react';
import { useState } from 'react';

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [Loading, setLoading] = useState(true)

    const createUser = (email, passowrd) => {
       setLoading(true) 
       return createUserWithEmailAndPassword(auth, email, passowrd)
    }
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }

    const loginUser = (email, passowrd) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, passowrd)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleAuthProvider = new GoogleAuthProvider()

    const SignInWithGoogle = () => {
        return signInWithPopup(auth, googleAuthProvider)
    }

    //--- Catch the user before relode the page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe;
    }, [])

    const authInfo = {
        createUser, 
        updateUser, 
        loginUser, 
        SignInWithGoogle, 
        logOut, 
        user, 
        Loading,
        setLoading
    }

    return (    
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;