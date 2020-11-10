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
    const [query, setQuery] = useState()
    const [isWaiting, setIsWaiting] = useState(true)

    const history = useHistory()
    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()

    const userEmail = user.email
    const streamsRepository = ApiService(accessToken).streams

    const directToLecture = (id) => {
        history.push({
            pathname: "/lecture",
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
            await streamsRepository
                .getUserByEmail(userEmail)
                .then((response) => setUserId(response.data.id))
        } catch (error) {
            console.error({ error })
        }
    }

    //FIX_ME first response fails
    const getStreams = async () => {
        try {
            await streamsRepository
                .getAvailableCourses(query)
                .then((response) => setCourses(response.data))
        } catch (error) {
            console.error({ error })
        }
    }

    const getUserCourses = async () => {
        let userCourses = null
        try {
            await streamsRepository
                .getUsersCourses(userId)
                .then((response) => (userCourses = response.data.userCourses))
        } catch (error) {
            console.error({ error })
        }

        //Geting list of courses user is already added
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
        const streamsRepository = ApiService(accessToken).streams
        try {
            await streamsRepository.deleteUserCourse(userCoursesId[id])
        } catch (error) {
            console.error(error)
        }
        window.location = "/"
    }

    const joinCourse = async (courseId) => {
        const streamsRepository = ApiService(accessToken).streams
        const body = {
            userId: userId,
            courseId: courseId,
        }
        await streamsRepository
            .addUserCourse(body)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error))

        window.alert("Dodano uzytkownika do wykladu wykladu")
        window.location = "/"
    }

    if (isWaiting) {
        return <FadeLoader></FadeLoader>
    }

    return (
        <div class="wrapper">
            <div class="box grid-courses">
                <div className="box-label">
                    <div className="box-label-name">WSZYSTKIE KURSY</div>
                </div>
                <table class="table">
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
                                            directToLecture(course.id)
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
                                                joinCourse(course.id)
                                            }
                                        >
                                            Dolacz do kursu
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                deleteUserCourses(
                                                    existedCourseLists.indexOf(
                                                        course.id
                                                    )
                                                )
                                            }
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
