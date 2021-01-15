import React, { useState, useEffect, useCallback } from "react"
import { AuthContext, authMethods } from "services/auth"
import { firebaseAuth } from "services/firebase"
import { SpinnerFullPage } from "components"

const getDefaultState = () => {
    return {
        user: {},
        accessToken: null,
    }
}

const AuthProvider = ({ children }) => {
    const [contextState, setContextState] = useState(getDefaultState())
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(
        contextState.accessToken === null ? true : false
    )

    const setContext = useCallback(
        (updates) => {
            setContextState({ ...contextState, ...updates })
        },
        [contextState, setContextState]
    )

    const getContextValue = useCallback(
        () => ({
            ...contextState,
            toggleLoggedOut: () => toggleLoggedOut(),
            setContext,
        }),
        [contextState, setContext]
    )

    const toggleLoggedOut = async () => {
        await authMethods.signOut()
        setContext(getDefaultState())
    }

    useEffect(() => {
        const unlisten = firebaseAuth
            .auth()
            .onAuthStateChanged(async (user) => {
                if (user) {
                    let accessToken = await user.getIdToken()
                    setContext({ user, accessToken })
                    setLoading(false)
                } else {
                    setContext(getDefaultState())
                    setLoading(false)
                }
            })
        return () => {
            unlisten()
        }
    }, [])

    if (loading) {
        return <SpinnerFullPage />
    }

    if (error) {
        return (
            <div className="container-fluid px-lg-5 mt-4">
                <div className="py-3 alert alert-danger" role="alert">
                    {error.message}
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={getContextValue()}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
