import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useHistory } from "react-router-dom"

import AddLectureModal from "../components/AddLectureModal"
import DeleteCourseModal from "../components/DeleteCourseModal"
import { AddCourseModal } from "components"

import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import * as Icon from "react-bootstrap-icons";

const ListLectures = ({ location }) => {
    const [lectures, setLectures] = useState([])
    const [courseOwnerEmail, setCourseOwnerEmail] = useState()
    const [tabKey, setTabKey] = useState('live')
   
    const { accessToken } = useAuthContext()
    const history = useHistory()
    const { user } = useAuthContext()
    const userEmail = user.email

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(13);
    
      //pagination variables
  const indexOfLastReq = currentPage * postsPerPage;
  const indexOfFirstReq = indexOfLastReq - postsPerPage;
  const currentReqs = lectures.slice(indexOfFirstReq, indexOfLastReq);

  const lastPageIndex = Math.ceil(lectures.length / postsPerPage);

    let courseId
    try {
        courseId = location.state.courseId
    } catch (e) {
        courseId = null
    }

    const simplePaging = () => {
        return (
          <div className="pagineButtons d-flex justify-content-center">
            {currentPage != 1 ? (
              <button
                className="btn btn-dark mx-3 pagineBarLeft navButton"
                onClick={() => setCurrentPage(1)}
              >
                <Icon.ArrowBarLeft color="white" size={20} />
              </button>
            ) : (
              <button
                className="btn btn-dark  mx-3 pagineBarLeft navButton"
                disabled
              >
                <Icon.ArrowBarLeft color="white" size={20} />
              </button>
            )}
            {currentPage > 1 ? (
              <button
                className="btn btn-dark mx-3 pagineLeft navButton"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <Icon.ArrowLeft color="white" size={20} />
              </button>
            ) : (
              <button className="btn btn-dark mx-3 pagineLeft navButton" disabled>
                <Icon.ArrowLeft color="white" size={20} />
              </button>
            )}
            {currentPage < lastPageIndex ? (
              <button
                className="btn btn-dark mx-3 pagineRight navButton"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <Icon.ArrowRight color="white" size={20} />
              </button>
            ) : (
              <button className="btn btn-dark mx-3 pagineRight navButton" disabled>
                <Icon.ArrowRight color="white" size={20} />
              </button>
            )}
            {currentPage < lastPageIndex ? (
              <button
                className="btn btn-dark mx-3 pagineBarRight navButton"
                onClick={() => setCurrentPage(lastPageIndex)}
              >
                <Icon.ArrowBarRight color="white" size={20} />
              </button>
            ) : (
              <button
                className="btn btn-dark mx-3 pagineBarRight navButton"
                disabled
              >
                <Icon.ArrowBarRight color="white" size={20} />
              </button>
            )}
          </div>
        );
      };

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


    return (     
        
        <div className="tabElement"> 
    <Tabs
      id="controlled-tab-example"
      activeKey={tabKey}
      onSelect={(k) => setTabKey(k)}
    >
      <Tab eventKey="live" title="Live">
      
      <div className="container-lectures">
            {addComponent()}
            {deleteComponent()}
            {editComponent()}
            <div className="wrapper-lectures">
                {currentReqs.map((lecture, i) => (

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
        
      </Tab>
      <Tab eventKey="saved " title="Saved streams">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </Tab>
      <Tab eventKey="materials" title="Materials" >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </Tab>
    </Tabs>
    {simplePaging()}
    </div>
    
    )
}

export default ListLectures
