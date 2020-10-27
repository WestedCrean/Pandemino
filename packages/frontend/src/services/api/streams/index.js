const StreamApiRoute = ApiService => {

    const getAvailableStreams = async () => await ApiService.get('/streams')

    const getStreamById = async id => await ApiService.get(`/streams/${id}`)

    const createStream = async data => await ApiService.post('/streams', data)



    const getAvailableCourses = async data => await ApiService.get('/courses', data)

    const getCourseById = async id => await ApiService.get(`/courses/${id}`)

    const createCourse = async data => await ApiService.post('/courses', data)

    
    return {
        getAvailableStreams,
        getStreamById,
        createStream,
        getAvailableCourses,
        getCourseById,
        createCourse
    }
}

export default StreamApiRoute