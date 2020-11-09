const StreamApiRoute = (ApiService) => {
    //STREAMY
    const getAvailableStreams = async () => ApiService.get("/lectures")

    const getStreamById = async (id) => ApiService.get(`/lectures/${id}`)

    const createStream = async (data) => ApiService.post("/lectures", data)

    //KURSY
    const getAvailableCourses = async (data = "") =>
        ApiService.get(`/courses?query=${data}`)

    const getCourseById = async (id) => ApiService.get(`/courses/${id}`)

    const createCourse = async (data) => ApiService.post("/courses", data)

    const deleteCourse = async (id) => ApiService.delete(`/courses/${id}`)

    const editCourse = async (id, data) => ApiService.put(`courses/${id}`, data)

    //POLACZENIA USER <-> KURS
    const addUserCourse = async (data) => ApiService.post("/userCourses", data)

    const deleteUserCourse = async (id) =>
        ApiService.delete(`/userCourses/${id}`)

    //USERZY
    const putUserData = async (id, data) => ApiService.put(`/users/${id}`, data)

    const getUsersCourses = async (id) => ApiService.get(`/users/${id}`)

    const getUsers = async () => ApiService.get(`/users`)

    const getUserByEmail = async (email) =>
        ApiService.get(`/users/single/${email}`)

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
        deleteCourse,
        editCourse,
    }
}

export default StreamApiRoute
