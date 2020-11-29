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
    const { user, accessToken } = useAuthContext()
    const history = useHistory()
    const userEmail = user.email

    const directToLecture = (id, name, description) => {
        history.push({
            pathname: `/course/${id}`,
            state: {
                courseId: id,
                courseName: name,
                courseDescription: description,
            },
        })
    }

    const getStreams = async () => {
        let id = null
        const api = ApiService(accessToken)
        try {
            const response = await api.getUserByEmail(userEmail)
            id = response.data.id
        } catch (error) {
            console.error({ error })
        }
        getUser(id)
    }

    const getUser = async (id) => {
        const api = ApiService(accessToken)
        try {
            const response = await api.getUsersCourses(id)
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
                        <tr key={`${course.course.id}`}>
                            <td>{i + 1}</td>
                            <td>{course.course.name}</td>
                            {course.course.lecturer.firstName ? (
                                <td>{`${course.course.lecturer.firstName} ${course.course.lecturer.lastName}`}</td>
                            ) : (
                                <td>{course.course.lecturer.email}</td>
                            )}

                            <td>
                                <Button
                                    variant="dark"
                                    onClick={() =>
                                        directToLecture(
                                            course.course.id,
                                            course.course.name,
                                            course.course.description
                                        )
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
