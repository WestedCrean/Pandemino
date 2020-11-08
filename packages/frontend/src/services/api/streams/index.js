const StreamApiRoute = (ApiService) => {
    const getAvailableStreams = async () => ApiService.get("/lectures")

    const getStreamById = async (id) => ApiService.get(`/lectures/${id}`)

    const createStream = async (data) => ApiService.post("/lectures", data)

    const getAvailableCourses = async (data = "") =>
        ApiService.get(`/courses?query=${data}`)

    const getCourseById = async (id) => ApiService.get(`/courses/${id}`)

    const createCourse = async (data) => ApiService.post("/courses", data)

    const getUsersCourses = async (id) => ApiService.get(`/users/${id}`)

    const getUsers = async () => ApiService.get(`/users`)

    const getUserByEmail = async (email) =>
        ApiService.get(`/users/single/${email}`)

    const addUserCourse = async (data) => ApiService.post("/userCourses", data)

    const deleteUserCourse = async (id) =>
        ApiService.delete(`/userCourses/${id}`)

    const deleteCourse = async (id) =>
        ApiService.delete(`/courses/${id}`)

    const putUserData = async (id, data) => ApiService.put(`/users/${id}`, data)

    return {
        getAvailableStreams,
        getStreamById,
        createStream,
        getAvailableCourses,
        getCourseById,
        createCourse,
        getUsersCourses,
        getUsers,
        getUserByEmail,
        addUserCourse,
        deleteUserCourse,
        putUserData,
        deleteCourse
    }
}

export default StreamApiRoute
