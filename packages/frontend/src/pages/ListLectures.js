import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"

import AddLectureModal from "../components/AddLectureModal"
import DeleteCourseModal from "../components/DeleteCourseModal"
import { AddCourseModal } from "components"

const ListLectures = ({ location }) => {
    const [lectures, setLectures] = useState([])
    const [courseOwnerEmail, setCourseOwnerEmail] = useState()
    const { accessToken } = useAuthContext()
    const history = useHistory()
    const { user } = useAuthContext()
    const userEmail = user.email

    let courseId
    try {
        courseId = location.state.courseId
    } catch (e) {
        courseId = null
    }

    const moveToLecturePage = (id) => {
        history.push({
            pathname: `/lecture/${id}`,
            state: {
                lectureId: id,
            },
        })
    }

    const deleteComponent = () => {
        if (userEmail === courseOwnerEmail) {
            return (
                <div className="box-deleteCourse">
                    <DeleteCourseModal courseId={courseId}></DeleteCourseModal>
                </div>
            )
        }
        return null
    }
    const addComponent = () => {
        if (userEmail === courseOwnerEmail) {
            return (
                <div className="box-addNewCourse">
                    <AddLectureModal courseId={courseId}></AddLectureModal>
                </div>
            )
        }
    }
    const editComponent = () => {
        if (userEmail === courseOwnerEmail) {
            return (
                <div className="box-editCourse">
                    <AddCourseModal
                        courseIdProps={courseId}
                        type="edit"
                    ></AddCourseModal>
                </div>
            )
        }
    }

    const getStreams = async () => {
        const api = ApiService(accessToken)
        try {
            const response = await api.getCourseById(courseId)
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
            {addComponent()}
            {deleteComponent()}
            {editComponent()}
            <div className="wrapper-lectures">
                {lectures.map((lecture, i) => (

                    <div
                        key={`${lecture.name}-${lecture.views}-${i}`}
                        className="box-lectures "
                        onClick={() => moveToLecturePage(lecture.id)}
                    >
                        <div className="box-label">
                            <div className="box-label-name">{lecture.name}</div>
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
