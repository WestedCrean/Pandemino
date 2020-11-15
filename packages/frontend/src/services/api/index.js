import createApiInstance from './createApiInstance'
import ApiRoutes from 'services/api/routes'

const API_URL = process.env.REACT_APP_PANDEMINO_API_URL

const ApiService = (authToken) => {
    const apiInstance = createApiInstance(API_URL, authToken)

    const routes = ApiRoutes(apiInstance)

    return ({
        ...routes
    })
}

export default ApiService

