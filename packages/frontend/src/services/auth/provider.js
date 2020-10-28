import React, { useState, useEffect } from "react"
import AuthContext from './context'

import { authMethods } from './methods'

const AuthProvider = ({ children }) => {
    const [contextState, setContextState] = useState({
        user: null,
        accessToken: null,
        loggedIn: false
    })

    const [error, setError] = useState(null)

    

    const toggleLoggedOut = async () => {
        await authMethods.signOut()
        setContextState({
            user: null,
            accessToken: null,
            isLoggedIn: false
        })
    }

    const handleAuthObserver = async () => {
        try {
            const newState = await authMethods.onAuthStateChange(setContextState)
            console.log({ newState })
            if (newState.accessToken != contextState.accessToken) {
                setContextState(...newState)
            }
        } catch (e) {
            setError(e)
        }
    }

    useEffect( () => {
        handleAuthObserver()
    },[])


    if (error) {
        return (
            <div className="container-fluid px-lg-5 mt-4">
                <div class="py-3 alert alert-danger" role="alert">{error.message}</div>
            </div>
        ) 
    }

    return (
        <AuthContext.Provider

            value={{
                user: contextState.user,
                accessToken: contextState.accessToken,
                loggedIn: contextState.logIn,
                toggleLoggedOut: toggleLoggedOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }