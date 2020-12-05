import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"

import AddLectureModal from "../components/AddLectureModal"
import DeleteCourseModal from "../components/DeleteCourseModal"
import { AddCourseModal } from "components"

import Button from "react-bootstrap/Button"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Pagination from "../components/pagination"
import * as Icon from "react-bootstrap-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faArrowLeft,
    faArrowRight,
    faCog,
    faMinus,
} from "@fortawesome/free-solid-svg-icons"

import Files from "components/Files"
import CreateQuiz from "../components/CreateQuiz"
import GetQuiz from "../components/GetQuiz"
import DeleteLectureModal from "components/DeleteLectureModal"

import TeacherPanel from "components/TeacherPanel"

import MarkPresenceBtn from "components/MarkPresenceBtn"

const ListLectures = (props) => {
    //styles
    const [sidebar, setSidebar] = useState("sidebar")

    const showSideBar = () => {
        if (sidebar == "sidebar") {
            setSidebar("sidebar-active")
        } else {
            setSidebar("sidebar")
        }
    }

    ////main code

    const [lectures, setLectures] = useState([])
    const [courseOwnerEmail, setCourseOwnerEmail] = useState()
    const [tabKey, setTabKey] = useState("live")

    const [currentLecture, setCurrentLecture] = useState(null)
    const [currentLectureName, setCurrentLectureName] = useState("")
    const [currentLectureDescription, setCurrentLectureDescription] = useState()

    const { accessToken } = useAuthContext()
    const history = useHistory()
    const { user } = useAuthContext()
    const userEmail = user.email

    //pagination variables
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(15)

    const indexOfLastReq = currentPage * postsPerPage
    const indexOfFirstReq = indexOfLastReq - postsPerPage
    const currentReqs = lectures.slice(indexOfFirstReq, indexOfLastReq)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    let courseId
    try {
        courseId = props.location.state.courseId
    } catch (e) {
        courseId = null
    }

    let courseName = props.location.state.courseName
    let courseDescription = props.location.state.courseDescription

    const moveToLecturePage = (id) => {
        history.push({
            pathname: `/lecture/${id}`,
            state: {
                lectureId: id,
            },
        })
    }


    const deleteLecture = () => {
        if (userEmail === courseOwnerEmail) {
            return (
                <DeleteLectureModal
                    lectureId={currentLecture}
                ></DeleteLectureModal>
            )
        }
        return null
    }
    const addComponent = () => {
        if (userEmail === courseOwnerEmail) {
            return (
                <div className="box-addNewLecture">
                    <AddLectureModal courseId={courseId}></AddLectureModal>
                </div>
            )
        }
    }
    const editComponent = () => {
        if (userEmail === courseOwnerEmail) {
            return (
                <AddCourseModal
                    courseIdProps={courseId}
                    type="edit"
                    courseDescriptionAlready={courseDescription}
                    courseNameAlready={courseName}
                ></AddCourseModal>
            )
        }
    }

    const tabCreateQuiz = () => {
        if (userEmail === courseOwnerEmail) {
            return false
        } else {
            return true
        }
    }

    const getStreams = async () => {
        const api = ApiService(accessToken)

        try {
            const response = await api.getCourseById(courseId)
            if (response.data.lectures.length !== 0) {
                setLectures(response.data.lectures)
                setCurrentLecture(response.data.lectures[0].id)
                setCurrentLectureName(response.data.lectures[0].name)
                setCurrentLectureDescription(
                    response.data.lectures[0].description
                )
            } else {
                setLectures([])
                setCurrentLecture(null)
            }
            setCourseOwnerEmail(response.data.lecturer.email)
        } catch (error) {
            console.error({ error })
        }
    }
    useEffect(() => {
        if (lectures.length == 0) {
            getStreams()
        }
        console.log(currentLecture)
    }, [currentLecture])

    return (
        <div className="">
            <MarkPresenceBtn lectureId={currentLecture}></MarkPresenceBtn>
            <div className="main-lectures-wrapper">
                <nav className={`sidebar ${sidebar}`}>
                    <div className="sidebar-header-main">
                        <div className="sidebar-header">
                            <h3>Lista wykładów</h3>
                        </div>
                    </div>
                    <ul className="list-unstyled components">
                        {currentReqs.map((lecture, i) => (
                            <div className="wrapper-lectures">
                                <li
                                    key={`${lecture.name}-${lecture.views}-${i}`}
                                    className="box-lectures "
                                    // onClick={() => moveToLecturePage(lecture.id)}
                                    onClick={() => {
                                        setCurrentLecture(lecture.id)
                                        setCurrentLectureName(lecture.name)
                                        showSideBar()
                                    }}
                                >
                                    <div className="box-label">
                                        <div className="box-label-name">
                                            {lecture.name}
                                            {deleteLecture()}
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                    {/* <Pagination postsPerPage={postsPerPage} 
                                            totalPosts={lectures.length} 
                                            paginate={paginate}>

                                            </Pagination> */}
                    <div className="nav-buttons">
                        {addComponent()}
                    </div>
                </nav>

                <div className="bookmarks-wrapper">
                    {sidebar == "sidebar" ? (
                        <FontAwesomeIcon
                            className="show-sidebar-button"
                            onClick={() => showSideBar()}
                            size="2x"
                            icon={faArrowRight}
                        ></FontAwesomeIcon>
                    ) : (
                        <FontAwesomeIcon
                            className="show-sidebar-button"
                            onClick={() => showSideBar()}
                            size="2x"
                            icon={faArrowLeft}
                        ></FontAwesomeIcon>
                    )}
                    <h1 className="d-flex justify-content-center">
                        {courseName}
                        {editComponent()}
                    </h1>
                    <h2 className="d-flex justify-content-center">
                        {currentLectureName}
                    </h2>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={tabKey}
                        className="tabsCourses"
                        onSelect={(k) => setTabKey(k)}
                    >
                        <Tab eventKey="course-description" title="Opis Kursu">
                            <div className="container-md course-desc mt-2">
                                <h5 className="mt-2">Opis Kursu</h5>
                                <div className="mt-2">{courseDescription}</div>
                            </div>
                            <div className="container-md course-desc mt-2">
                                <h5 className="mt-2">Opis Wykładu</h5>
                                <div className="mt-2">
                                    {currentLectureDescription}
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="materials" title="Materiały">
                            <Files lectureId={currentLecture}></Files>
                        </Tab>
                        <Tab eventKey="quizes" title="Quiz">
                            <GetQuiz lectureId={currentLecture}></GetQuiz>
                        </Tab>
                        <Tab
                            eventKey="create-quiz"
                            title="Utwórz quiz"
                            disabled={tabCreateQuiz()}
                        >
                            <CreateQuiz lectureId={currentLecture}></CreateQuiz>
                        </Tab>
                        <Tab
                            eventKey="teacher-panel"
                            title="Panel nauczyciela"
                            disabled={tabCreateQuiz()}
                        >
                            <TeacherPanel
                                currentLecture={currentLecture}
                                courseOwnerEmail={courseOwnerEmail}
                            ></TeacherPanel>
                        </Tab>
                    </Tabs>
                </div>
                <div class="overlay"></div>
            </div>
        </div>
    )
}

export default ListLectures
