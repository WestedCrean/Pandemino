import React, { useState, useEffect, useCallback } from "react"
import { AuthContext } from 'services/auth'
import { firebaseAuth } from 'services/firebase'
import { Spinner } from 'components'

const getDefaultState = () => {
    return ({
        user: {},
        accessToken: null
    })
}

const AuthProvider = ({ children }) => {
    const [contextState, setContextState] = useState(getDefaultState())
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const setContext = useCallback(
        updates => {
            setContextState({ ...contextState, ...updates })
        },
        [contextState, setContextState],
    )

    const getContextValue = useCallback(
        () => ({
            ...contextState,
            toggleLoggedOut,
            setContext,
        }),
        [contextState, setContext],
    )

    const toggleLoggedOut = () => {
        setContext(getDefaultState())
    }


    useEffect(() => {
        const unlisten = firebaseAuth.onAuthStateChanged(
            async user => {
                if (user) {
                    let accessToken = await user.getIdToken()
                    setContext({ user, accessToken })
                    setLoading(false)
                } else {
                    setContext(getDefaultState())
                    setLoading(false)
                }
            },
        );
        return () => {
            unlisten();
        }
    }, []);


    if (loading) {
        return (<Spinner />)
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
            value={getContextValue()}
        >
            {children}
        </AuthContext.Provider>

    )
}

export { AuthProvider }