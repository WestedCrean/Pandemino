import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"

const ListCourses = () => {
    const [courses, setCourses] = useState([])
    const { accessToken } = useAuthContext()
    const history = useHistory()

    const directToLecture = (id) => {
        history.push({
            pathname: "/lecture",
            state: {
                courseId: id,
            },
        })
    }

    const getStreams = async () => {
        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getAvailableCourses()
            setCourses(response.data)
        } catch (error) {
            console.error({ error })
        }
    }
    useEffect(() => {
        getStreams()
    }, [])

    return (
        <Fragment>
            <div className="list-container">
                <div className="list-streams">
                    {courses.map((course, i) => (
                        <div
                            className="list-element"
                            key={`${course.name}-${course.views}-${i}`}
                            onClick={() => directToLecture(course.id)}
                        >
                            <div className="list-element-inside">
                                <div className="list-element-badge" />
                                <div className="list-element-leader">
                                    {course.name}
                                </div>
                                <div className="list-element-description">
                                    {course.description}
                                </div>
                                <div className="list-element-data">
                                    {course.views}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default ListCourses
