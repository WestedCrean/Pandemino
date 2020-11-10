import React, { Fragment, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"
import { faEdit, faHandPointRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AddCourseModal } from "components"
const ListUsersCourses = () => {
    const [courses, setCourses] = useState([])
    const { accessToken } = useAuthContext()
    const history = useHistory()
    const { user } = useAuthContext()

    const userEmail = user.email

    const directToLecture = (id) => {
        history.push({
            pathname: `/course/${id}`,
            state: {
                courseId: id,
            },
        })
    }

    const getStreams = async () => {
        let id = null
        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getUserByEmail(userEmail)
            id = response.data.id
        } catch (error) {
            console.error({ error })
        }
        getUser(id)
    }

    const getUser = async (id) => {
        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getUsersCourses(id)
            setCourses(response.data.userCourses)
        } catch (error) {
            console.error({ error })
        }
    }

    useEffect(() => {
        getStreams()
    }, [])

    return (
        <div>
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
                        <tr key={`${course.course.id}`}>
                            <td>{i + 1}</td>
                            <td>{course.course.name}</td>
                            <td>{course.course.lecturer.email}</td>
                            <td>
                                <Button
                                    variant="dark"
                                    onClick={() =>
                                        directToLecture(course.course.id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faHandPointRight}
                                        size="1x"
                                    />{" "}
                                    Stream
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListUsersCourses
