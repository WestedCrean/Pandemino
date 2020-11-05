import React, { Fragment, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"
import { Navbar } from "components"
import AddCourseModal from "../components/AddCourseModal"

const ListCourses = () => {

    const [userId, setUserId] = useState()
    const [courses, setCourses] = useState([])
    const [existedCourseLists, setExistedCourseList] = useState([])
    const [isWaiting, setIsWaiting] = useState(true)
    const { accessToken } = useAuthContext()
    const history = useHistory()
    const { user } = useAuthContext()
    const [userCoursesId, setUserCoursesId] = useState([])

    const userEmail = user.email

    const directToLecture = (id) => {
        history.push({
            pathname: "/lecture",
            state: {
                courseId: id,
            },
        })
    }

    useEffect(() => {

        getUser();
        getStreams();
        getUserCourses();
    },[userId])

    const getUser = async () => {
    
        const streamsRepository = ApiService(accessToken).streams
        try {
            await streamsRepository.getUserByEmail(userEmail).then(
                (response) =>  setUserId(response.data.id)
            )
        } catch (error) {
            console.error({ error })
        }
    }

    //FIX_ME first reponse fails
    const getStreams = async () => {
        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getAvailableCourses()
            setCourses(response.data)
        } catch (error) {
            console.error({ error })
        }
    }

    const getUserCourses = async () => {
        let userCourses = null
        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getUsersCourses(userId)
            userCourses = response.data.userCourses
        } catch (error) {
            console.error({ error })
        }

        ///Geting list of courses user is already added
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
        return <div>Czekamy</div>
    }



    return (
        <div>
            <Navbar></Navbar>
            <Fragment>
                <div class="wrapper">
                    <div class="box grid-courses">
                        <div className="box-label">
                            <div className="box-label-name">
                                WSZYSTKIE KURSY
                            </div>
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
                                        <td>{course.lecturer}</td>
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
                                            {existedCourseLists.includes(
                                                course.id
                                            ) === false ? (
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
                        <div className="box-addNewCourse">
                            <AddCourseModal></AddCourseModal>
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    )
}

export default ListCourses
