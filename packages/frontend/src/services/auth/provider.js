import React, { useState, useCallback } from "react"
import { AuthContext, useAuthState } from 'services/auth'
import { useFirebaseContext } from 'services/firebase'
import _ from 'lodash'

const getDefaultState = () => {
    return ({
        user: {},
        accessToken: null
    })
}

const AuthProvider = ({ children }) => {
    const firebase = useFirebaseContext();
    const [contextState, setContextState] = useAuthState(firebase, getDefaultState())
    const [error, setError] = useState(null)


    const setContext = useCallback(
        updates => {
            setContextState({ ...contextState, ...updates })
        },
        [contextState, setContextState],
    )

    const getContextValue = useCallback(
        () => ({
            ...contextState,
            setContext,
        }),
        [contextState, setContext],
    )

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