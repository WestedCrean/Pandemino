import React, { Fragment, useEffect, useState, useCallback } from "react"
import { Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"
import { Navbar, AddCourseModal } from "components"
import FadeLoader from "react-spinners/FadeLoader"

const ListCourses = () => {
    const [userId, setUserId] = useState(null)
    const [courses, setCourses] = useState([])
    const [userCoursesId, setUserCoursesId] = useState([])
    const [existedCourseLists, setExistedCourseList] = useState([])
    const [query, setQuery] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)

    const history = useHistory()
    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()

    const userEmail = user.email
    const api = ApiService(accessToken)

    const moveToCourse = (id) => {
        history.push({
            pathname: `/course/${id}`,
            state: {
                courseId: id,
            },
        })
    }

    useEffect(() => {
        if (userId === null) {
            getUser()
        } else {
            getStreams()
            getUserCourses()
        }
    }, [userId, query])


    const getUser = async () => {
        try {
            await api
                .getUserByEmail(userEmail)
                .then((response) => setUserId(response.data.id))
        } catch (error) {
            console.error({ error })
        }
    }

    // FIXME first response fails
    const getStreams = async () => {
        try {
            const response = await api
                .getAvailableCourses(query)
            setCourses(response.data)
        } catch (error) {
            console.error({ error })
        }
    }

    const getUserCourses = async () => {
        let userCourses = null
        try {
            await api
                .getUsersCourses(userId)
                .then((response) => (userCourses = response.data.userCourses))
        } catch (error) {
            console.error({ error })
        }

        // Geting list of courses user is already added
        if (userCourses == null) {
            setIsWaiting(false)
            return
        }

        let list = []
        let listId = []

        userCourses.map((course) => {
            list.push(course.course.id)
            listId.push(course.id)
        })

        if (existedCourseLists.length != null) {
            setExistedCourseList(list)
            setIsWaiting(false)
            setUserCoursesId(listId)
        }
    }
    const deleteUserCourses = async (id) => {
        try {
            await api.deleteUserCourse(id)
        } catch (error) {
            console.error(error)
        }
    }

    const joinCourse = async (courseId) => {
        const body = {
            userId: userId,
            courseId: courseId,
        }
        await api
            .addUserCourse(body)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error))
        window.alert("Dodano uzytkownika do wykladu wykladu")
    }
    const handleJoinCourse = async (course) => {
        console.log({ course })
        await joinCourse(course.id)
        getUserCourses()
    }

    const handleQuitCourse = async (course) => {
        console.log({ course })
        await deleteUserCourses(course.id)
        getUserCourses()
    }


    if (isWaiting) {
        return <FadeLoader></FadeLoader>
    }

    return (
        <div className="wrapper">
            <div className="box grid-courses">
                <div className="box-label">
                    <div className="box-label-name">WSZYSTKIE KURSY</div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th>Nazwa </th>
                            <th>Wykładowca</th>
                            <th>Stream</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, i = 0) => (
                            <tr key={`${course.id}`}>
                                <td>{i + 1}</td>
                                <td>{course.name}</td>
                                <td>{course.lecturer.email}</td>
                                <td>
                                    <Button
                                        variant="dark"
                                        onClick={() =>
                                            moveToCourse(course.id)
                                        }
                                    >
                                        Stream
                                    </Button>
                                </td>
                                <td>
                                    {existedCourseLists.includes(course.id) ===
                                        false ? (
                                            <Button
                                                variant="dark"
                                                onClick={() =>
                                                    handleJoinCourse(course)
                                                }
                                            >
                                                Dolacz do kursu
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleQuitCourse(course)}
                                                variant="danger"
                                            >
                                                Odejdź z kursu
                                            </Button>
                                        )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flexs p-2">
                    <div className="md-form active-pink active-pink-2 mb-3 mt-0">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        ></input>
                    </div>
                    <div className="box-addNewCourse">
                        <AddCourseModal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCourses
