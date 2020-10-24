import React, { useEffect, useState, createContext } from "react"
import firebase from "services/firebase"


const AuthContext = createContext({
    user: null,
    isLoggedIn: false
})
const AuthProvider = ({ children }) => {
    const [contextState, setContextState] = useState({
        user: null,
        isLoggedIn: false
    })

    const [pending, setPending] = useState(true)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setContextState({
                user: user,
                isLoggedIn: true
            })
            setPending(false)
        })
    }, [])

    if (pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                ...contextState
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProvider }