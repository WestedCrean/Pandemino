import { useState, useEffect } from "react"
import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import { useToasts } from "react-toast-notifications"

function useUserInfo() {
    const { addToast } = useToasts()
    const { accessToken, user } = useAuthContext()
    const [userData, setUserData] = useState({})
    const api = ApiService(accessToken)
    const fetchUserData = async () => {
        try {
            const res = await api.getUserByEmail(user.email)
            setUserData(res.data)
        } catch (e) {
            addToast("Could not connect to the server", { appearance: "error" })
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    return userData
}

export { useUserInfo }
