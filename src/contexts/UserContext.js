import React, { Children, createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from '../firebase/firebase.init'


export const AuthContext = createContext()
const auth = getAuth(app)
const UserContext = ({children}) => {


    const [user, setUser] = useState({})
     
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    } 
    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(   ()=>{
      const unSubscribed =   onAuthStateChanged(auth, currentUser =>{
            console.log('current user inside state change ', currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => unSubscribed();
     },[])

    const authInfo = {user, loading,setUser,createUser, signInUser, logOut}

   
    return (
       <AuthContext.Provider  value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default UserContext;