import React, { useEffect, useState, createContext, FunctionComponent } from "react"
import { User } from "firebase"

import base from "services/database"

type AuthProviderProps = {
    children: React.ReactChildren,
}

interface IAuthContext {
    user: User | null
}

export const AuthContext = createContext<IAuthContext>({
    user: null
})

export const AuthProvider : FunctionComponent<AuthProviderProps> = ({ children  }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        base.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        })
    }, [])

    if (pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                user : currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
