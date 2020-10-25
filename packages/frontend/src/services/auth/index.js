import React, { useState, createContext, useContext } from "react"
import firebase from "services/firebase"


const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    apiToken: null,
    toggleLoggedIn: () => {},
    toggleLoggedOut: () => {}
})

const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [contextState, setContextState] = useState({
        user: null,
        isLoggedIn: false
    })

    const [error, setError] = useState(null)


    const toggleLoggedIn = () => {
        try {
            let user = firebase.auth().currentUser
            if (user != null) {
                setContextState({
                    user: user,
                    isLoggedIn: true
                })
            } else {
                setError("no user is logged in")
            }
            
        } catch (e) {
            
        }
    } 

    const toggleLoggedOut = async () => {
        await firebase.auth().signOut()
        setContextState({
            user: null,
            isLoggedIn: false
        })
    }


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
                isLoggedIn: contextState.isLoggedIn,
                toggleLoggedIn: toggleLoggedIn,
                toggleLoggedOut: toggleLoggedOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, useAuthContext, AuthProvider }