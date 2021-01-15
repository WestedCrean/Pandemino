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

    const directToCourse = (id) => {
        history.push({
            pathname: `/course/${id}`,
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
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th>Nazwa </th>
                        <th>Wykładowca</th>
                        <th>Strona kursu</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, i = 0) => (
                        <tr key={`${course.course.id}`}>
                            <td>{i + 1}</td>
                            <td>{course.course.name}</td>
                            {course.course.lecturer.firstName ? (
                                <td>
                                    <a
                                        href={`/userInfo/${course.course.lecturer.email}`}
                                        target="_blank"
                                    >
                                        {`${course.course.lecturer.firstName} ${course.course.lecturer.lastName}`}
                                    </a>
                                </td>
                            ) : (
                                <td>
                                    <a
                                        href={`/userInfo/${course.course.lecturer.email}`}
                                        target="_blank"
                                    >
                                        {course.course.lecturer.email}
                                    </a>
                                </td>
                            )}

                            <td>
                                <Button
                                    className="cy-idz-widokKursu"
                                    variant="dark"
                                    onClick={() =>
                                        directToCourse(course.course.id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faHandPointRight}
                                        size="1x"
                                    />{" "}
                                    Przejdź do kursu
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
