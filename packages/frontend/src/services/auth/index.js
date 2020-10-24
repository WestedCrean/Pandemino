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
    const [error, setError] = useState(null)

    useEffect(() => {
        try {
            firebase.auth().onAuthStateChanged((user) => {
                setContextState({
                    user: user,
                    isLoggedIn: true
                })
                setPending(false)
            })
        } catch (e) {
            setError(e)
        }
    }, [])

    if (error) {
        return (
            <div className="container-fluid px-lg-5 mt-4">
                <div class="py-3 alert alert-danger" role="alert">{error.message}</div>
            </div>
        ) 
    }


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