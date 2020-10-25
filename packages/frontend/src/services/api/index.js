import createApiInstance from './createApiInstance'
import StreamApiRoute from 'services/api/streams'

const API_URL = process.env.REACT_APP_PANDEMINO_API_URL

const ApiService = (authToken) => {
    const apiInstance = createApiInstance(API_URL, authToken)

    return({
        streams : StreamApiRoute(apiInstance)
    })
}

export default ApiService

