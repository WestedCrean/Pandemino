import React, {
    Fragment,
    useEffect,
    useState,
} from "react"

import { useAuthContext } from 'services/auth'
import ApiService from 'services/api'
import { useHistory } from "react-router-dom";
import {Navbar} from "components"
import AddLectureModal from "../components/AddLectureModal"

const ListLectures = (props) => {
    const [lectures, setLectures] = useState([])
    const { accessToken } = useAuthContext()
    const history = useHistory();

    const courseId = props.location.state.courseId;

    const getStreams = async () => {
        const streamsRepository = ApiService(accessToken).streams
        try {
            /**

             */
            const response = await streamsRepository.getCourseById(courseId);
            //console.log(response.data);
            setLectures(response.data.lectures)
        } catch (error) {
            console.error({error})
        }
    }
    useEffect(() => {
        getStreams()
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <Fragment>
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
            </Fragment>
        </div>
    )
}

export default ListLectures;
