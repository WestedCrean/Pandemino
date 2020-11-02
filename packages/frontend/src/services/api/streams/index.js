const StreamApiRoute = (ApiService) => {
    const getAvailableStreams = async () => ApiService.get("/lectures")

    const getStreamById = async (id) => ApiService.get(`/lectures/${id}`)

    const createStream = async (data) => ApiService.post("/lectures", data)

    const getAvailableCourses = async (data) => ApiService.get("/courses")

    const getCourseById = async (id) => ApiService.get(`/courses/${id}`)

    const createCourse = async (data) => ApiService.post("/courses", data)

    return {
        getAvailableStreams,
        getStreamById,
        createStream,
        getAvailableCourses,
        getCourseById,
        createCourse,
    }
}

export default StreamApiRoute
