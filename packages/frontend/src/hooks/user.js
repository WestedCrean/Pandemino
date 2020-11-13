import { useState, useEffect } from 'react';
import ApiService from "services/api"
import { useAuthContext } from 'services/auth'

function useUserInfo() {
    const { accessToken, user } = useAuthContext()
    const [userData, setUserData] = useState({});
    const api = ApiService(accessToken)
    const fetchUserData = async () => {
        const res = await api
            .getUserByEmail(user.email)
        setUserData(res.data)
    }
    useEffect(() => {
        fetchUserData()
    }, []);

    return userData;
}

export { useUserInfo }