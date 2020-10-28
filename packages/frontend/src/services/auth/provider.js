import React, { useState, useEffect } from "react"
import AuthContext from './context'

import { authMethods } from './methods'
import _ from 'lodash'

const AuthProvider = ({ children }) => {
    const [contextState, setContextState] = useState({
        user: null,
        accessToken: null,
    })
    const [error, setError] = useState(null)

    

    const toggleLoggedOut = async () => {
        await authMethods.signOut()
        setContextState({
            user: null,
            accessToken: null,
        })
    }

   

    const setUser = (user,accessToken) => {
        const currentUser = contextState.user
        if (!_.isEqual(user, currentUser)) {
            setContextState({ user, accessToken})
        }
    }

    const handleAuthObserver = async () => {
        authMethods.onAuthStateChange(setUser).catch(e => setError(e))
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
                toggleLoggedOut: toggleLoggedOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }