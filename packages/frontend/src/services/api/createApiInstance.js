import axios from 'axios'

const createApiInstance = (apiUrl, authToken) => {
    const Api = axios.create({
        baseURL: apiUrl,
        responseType: 'json',
    })
    Api.interceptors.request.use(
        config => {
            if (authToken) {
                config.headers['Authorization'] =
                    'Bearer ' + authToken
            }
            return config
        },
        error => {
            Promise.reject(error)
        }
    )

    return Api
}

export default createApiInstance