import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../Firebase/Firebase.config'
import { useEffect } from 'react';
import { useState } from 'react';

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [Loading, setLoading] = useState(true)

    const createUser = (email, passowrd) => {
       return createUserWithEmailAndPassword(auth, email, passowrd)
    }
    const loginUser = (email, passowrd) => {
        return signInWithEmailAndPassword(auth, email, passowrd)
    }
    const logOut = () => {
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

    const authInfo = {createUser, loginUser, SignInWithGoogle, logOut, user, Loading}

    return (    
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;