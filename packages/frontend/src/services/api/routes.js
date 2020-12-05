const ApiRoutes = (ApiService) => {
    //STREAMY
    const getAvailableStreams = async () => ApiService.get("/lectures")

    const getStreamById = async (id) => ApiService.get(`/lectures/${id}`)

    const createStream = async (data) => ApiService.post("/lectures", data)

    const getLectures = async () => ApiService.get("/lectures/")

    const deleteLecture = async (id) => ApiService.delete(`/lectures/${id}`)

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

    const getUsersCourses = async (id) => ApiService.get(`/users/${id}`)

    const getAllUsersCourses = async () => ApiService.get("/userCourses")

    //USERZY
    const putUserData = async (id, data) => ApiService.put(`/users/${id}`, data)

    const getUsers = async () => ApiService.get(`/users`)

    const getUserByEmail = async (email) =>
        ApiService.get(`/users/single/${email}`)

    //PLIKI
    const addFile = async (data) => ApiService.post("/file", data)

    const getFileById = async (id) => ApiService.get(`/file/${id}`)

    const deleteFile = async (id) => ApiService.delete(`/file/${id}`)

    //QUIZ

    const getQuizes = async () => ApiService.get(`quiz`)

    const getQuizById = async (id) => ApiService.get(`quiz/${id}`)

    const addQuiz = async (data) => ApiService.post("quiz", data)

    const removeQuiz = async (id) => ApiService.delete(`quiz/${id}`)

    const getQuestions = async () => ApiService.get("questions")

    const getQuestionById = async (id) => ApiService.get(`questions/${id}`)

    const addQuestion = async (data) => ApiService.post("questions", data)

    const removeQuestion = async (id) => ApiService.delete(`questions/${id}`)

    const getVariants = async () => ApiService.get("variants")

    const addVariant = async (data) => ApiService.post("variants", data)

    //USERANSWER - connecton between user <--> answer <--> quiz

    const putUserAnswer = async (data) => ApiService.post("userAnswer", data)

    const getUserUserAnswers = async (id, quizId) =>
        ApiService.get(`users/${id}/${quizId}`)

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
        getLectures,
        addFile,
        getFileById,
        deleteFile,
        getQuizById,
        addQuiz,
        removeQuiz,
        getQuizes,
        getQuestions,
        getQuestionById,
        addQuestion,
        getVariants,
        addVariant,
        removeQuestion,
        putUserAnswer,
        getUserUserAnswers,
        deleteLecture,
        getAllUsersCourses,
    }
}

export default ApiRoutes
