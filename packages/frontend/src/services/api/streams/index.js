const StreamApiRoute = ApiService => {

    const getAvailableStreams = async () => await ApiService.get('/streams')

    const getStreamById = async id => await ApiService.get(`/quizzes/${id}`)

    const createStream = async data => await ApiService.post('/streams', data)

    return {
        getAvailableStreams,
        getStreamById,
        createStream
    }
}

export default StreamApiRoute