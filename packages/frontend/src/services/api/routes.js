const ApiRoutes = (ApiService) => {
    //STREAMY
    const getAvailableStreams = async () => ApiService.get("/lectures")

    const getStreamById = async (id) => ApiService.get(`/lectures/${id}`)

    const putStreamData = async (id, data) =>
        ApiService.put(`/lectures/${id}`, data)

    const createStream = async (data) => ApiService.post("/lectures", data)

    const getLectures = async () => ApiService.get("/lectures/")

    const deleteLecture = async (id) => ApiService.delete(`/lectures/${id}`)

    //KATEGORIE KURSÓW

    const getCourseCategories = async () => ApiService.get("courseCategory")

    const getCourseCategoryById = async (id) => ApiService.get(`courseCategory/${id}`)

    const createCourseCategory = async (data) => ApiService.get("courseCategory", data)
    //KURSY
    const getAvailableCourses = async (data = "") =>
        ApiService.get(`/courses?query=${data}`)

    const getCourseById = async (id) => ApiService.get(`/courses/${id}`)

    const createCourse = async (data) => ApiService.post("/courses", data)

    const deleteCourse = async (id) => ApiService.delete(`/courses/${id}`)

    const editCourse = async (id, data) => ApiService.put(`courses/${id}`, data)

    const setLiveLecture = async (id, data) =>
        ApiService.put(`courses/${id}/live`, data)

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

    ///lectureFrequency USER <---> LECTURES

    const getLectureFrequency = async () => ApiService.get("/lectureFrequency/")

    const getLectureFrequencyByCourseId = async (id) =>
        ApiService.get(`/lectureFrequency/${id}`)

    const findLectureFrequencyByUserLecture = async (userId, lectureId) =>
        ApiService.get(`/lectureFrequency/${userId}/${lectureId}`)

    const postLectureFrequency = async (data) =>
        ApiService.post("lectureFrequency", data)

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
        putStreamData,
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
        setLiveLecture,
        getAllUsersCourses,
        getLectureFrequency,
        findLectureFrequencyByUserLecture,
        postLectureFrequency,
        getLectureFrequencyByCourseId,
        getCourseCategories,
        getCourseCategoryById,
        createCourseCategory

    }
}

export default ApiRoutes
