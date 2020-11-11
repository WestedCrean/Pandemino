import { createContext, useContext } from 'react'

const AuthContext = createContext()

const useAuthContext = () => useContext(AuthContext)
const updateAuthContext = (userValue = {}, accessTokenValue = null) => {
    return ({ user: userValue, accessToken: accessTokenValue })
}

export { AuthContext, useAuthContext, updateAuthContext }