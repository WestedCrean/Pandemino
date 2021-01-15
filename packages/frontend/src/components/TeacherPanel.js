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
        let tab = []

        try {
            const currentLecture = parseInt(props.currentLecture)
            const { data } = await api.getAllUsersCourses()

            tab = data.filter(
                (userCourse) => userCourse.course.id === currentLecture
            )

            setUserCourses(tab)
        } catch (error) {
            console.error(error)
        }
    }
    const deleteUserFromCourse = async (userId) => {
        const api = ApiService(accessToken)
        try {
            await api.deleteUserCourse(userId)
        } catch (error) {}
    }
    const isOwner = (mail, id) => {
        console.log("isOwner")
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
    }, [])
    return (
        <div>
            <ul className="userCourseTable mt-3">
                {userCourses.length === 0 && (
                    <li>Brak zapisanych użytkowników</li>
                )}
                {userCourses.map((userCourse, i) => (
                    <li key={`${userCourse.course.id}-${userCourse.user.id}`}>
                        {userCourse.user.email}
                        {isOwner(userCourse.user.email, userCourse.id)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TeacherPanel
