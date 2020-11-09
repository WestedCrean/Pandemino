import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"
import { Navbar } from "components"
import AddLectureModal from "../components/AddLectureModal"
import DeleteCourseModal from "../components/DeleteCourseModal"

const ListLectures = (props) => {
    const [lectures, setLectures] = useState([])
    const [courseOwnerEmail, setCourseOwnerEmail] = useState();
    const { accessToken } = useAuthContext()

    const { user } = useAuthContext()

    const userEmail = user.email
    const courseId = props.location.state.courseId

    const deleteComponent = () => {

        if (userEmail === courseOwnerEmail) {
            return (
                <div className="box-deleteCourse">
                    <DeleteCourseModal courseId={courseId}></DeleteCourseModal>
                </div>
            )
        } return null
    }

    const getStreams = async () => {
        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getCourseById(courseId)
            setLectures(response.data.lectures)
            setCourseOwnerEmail(response.data.lecturer.email)
        } catch (error) {
            console.error({ error })
        }
    }
    useEffect(() => {
        getStreams()
    }, [])

    /* <Fragment>
                <AddLectureModal courseId={courseId}></AddLectureModal>
                <div className="list-container">
                    <div className="list-streams">
                        {lectures.map((lecture,i) => (
                            <div className="list-element" key={`${lecture.name}-${lecture.views}-${i}`}>
                                <div className="list-element-inside">
                                    <div className="list-element-badge" />
                                    <div className="list-element-leader">
                                        {lecture.name}
                                    </div>
                                    <div className="list-element-description">
                                        {lecture.description}
                                    </div>
                                    <div className="list-element-data">
                                        {lecture.views}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment> */

    return (


        <div className="container-lectures">
            <div className="box-addNewCourse">
                <AddLectureModal courseId={courseId}></AddLectureModal>
            </div>
            {deleteComponent()}
            <div className="wrapper-lectures">
                {lectures.map((lecture, i) => (
                    <div
                        key={`${lecture.name}-${lecture.views}-${i}`}
                        className="box-lectures "
                    >
                        <div className="box-label">
                            <div className="box-label-name">
                                {lecture.name}
                            </div>
                        </div>
                        <div className="box-lectures-content">
                            {lecture.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ListLectures
