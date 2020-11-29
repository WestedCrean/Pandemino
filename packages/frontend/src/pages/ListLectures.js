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
} from "@fortawesome/free-solid-svg-icons"

import Files from "components/Files"
import CreateQuiz from "../components/CreateQuiz"
import GetQuiz from "../components/GetQuiz"
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
                        {deleteComponent()}
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
                        <Tab eventKey="live" title="Live">
                            Witaj w kursie nr {currentLecture}
                        </Tab>
                        <Tab eventKey="saved " title="Zapisane Wideo">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            'Content here, content here', making it look like
                            readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their
                            default model text, and a search for 'lorem ipsum'
                            will uncover many web sites still in their infancy.
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like).
                        </Tab>
                        <Tab eventKey="materials" title="Materiały">
                            <Files lectureId={currentLecture}></Files>
                        </Tab>
                        <Tab eventKey="quizes" title="Quiz">
                            <GetQuiz lectureId={currentLecture}></GetQuiz>
                        </Tab>
                        <Tab eventKey="course-description" title="Opis Kursu">
                            {courseDescription}
                        </Tab>
                        <Tab
                            eventKey="create-quiz"
                            title="Utwórz quiz"
                            disabled={tabCreateQuiz()}
                        >
                            <CreateQuiz lectureId={currentLecture}></CreateQuiz>
                        </Tab>
                    </Tabs>
                </div>
                <div class="overlay"></div>
            </div>
        </div>
    )
}

export default ListLectures
