import React, { useEffect, useState, useRef } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons"

const TeacherPanel = (props) => {
    const { user, accessToken } = useAuthContext()
    const [userCourses, setUserCourses] = useState([])

    const getAllUserCourses = async () => {
        const api = ApiService(accessToken)
        const tab = []
        try {
            const response = await api.getAllUsersCourses()
            const data = response.data

            data.map((userCourse) => {
                if (userCourse.course.id === props.currentLecture) {
                    tab.push(userCourse)
                }
            })
        } catch (error) {
            console.error(error)
        }
        setUserCourses(tab)
    }
    const deleteUserFromCourse = async (userId) => {
        const api = ApiService(accessToken)
        try {
            await api.deleteUserCourse(userId)
        } catch (error) {}
    }
    const isOwner = (mail, id) => {
        console.log(id)
        if (props.courseOwnerEmail === mail) {
            return (
                <Button className="ml-3" variant="dark" size="sm" disabled>
                    <FontAwesomeIcon size="sm" icon={faStar}></FontAwesomeIcon>
                </Button>
            )
        } else {
            return (
                <Button
                    className="ml-3"
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUserFromCourse(id)}
                >
                    <FontAwesomeIcon size="sm" icon={faTrash}></FontAwesomeIcon>
                </Button>
            )
        }
    }

    useEffect(() => {
        getAllUserCourses()
    }, [userCourses])
    return (
        <div>
            {userCourses.map((userCourse, i) => (
                <ul className="userCourseTable mt-3">
                    <li key={`${userCourse.course.id}-${userCourse.user.id}`}>
                        {userCourse.user.email}
                        {isOwner(userCourse.user.email, userCourse.id)}
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default TeacherPanel
