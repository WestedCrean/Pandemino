import React, {useEffect, useState} from "react"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const Frequency = (props) => {

    const { accessToken } = useAuthContext()
    const courseId = props.courseId;
    const [frequency, setFrequency] = useState([])
    const [courseInfo, setCourseInfo] = useState([])

    const [lectures, setLectures] = useState([])
    const [users, setUsers] = useState([])

    const getFrequency = async() =>{

        const api = ApiService(accessToken)
        
        try {
            const resp = await api.getLectureFrequencyByCourseId(courseId)
            let frequencyList = []
            resp.data.map(element =>{
                frequencyList.push({"userId" : element.user.id, "lectureId" : element.lecture.id})
            })

            setFrequency(frequencyList)

            const response = await api.getCourseById(courseId)

            let lectureList = []
            response.data.lectures.map(lecture => {
                lectureList.push({"id" : lecture.id, "name" : lecture.name})
            })
            setLectures(lectureList)

            let usersList = []
            response.data.userCourses.map(user => {
                usersList.push({"id" : user.user.id, "name" : user.user.email} )
            })
            setUsers(usersList)
    
        }catch(error){console.log(error)}
    }

    const checkFrequency = (userId, lectureId) =>{

        let flag = false
        frequency.map(element => {
            if(element.lectureId === lectureId & element.userId === userId){
                
                flag = true
            }
        })

        return flag
    }

    useEffect(() => {
        getFrequency()
    }, [])



    return (
        <div>

                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    {lectures.map(lecutre =>
                                        <th className="text-center" scope={lecutre.id}>{lecutre.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr>
                                        <th scope="row">{user.name}</th>
                                        {lectures.map(lecture => 
                                            checkFrequency(user.id, lecture.id) ? <th className="text-center"> <FontAwesomeIcon
                                            
                                                icon={faTimes}
                                        ></FontAwesomeIcon></th> : <th></th>)}
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </table>
                    </div>

            {/* {users.map(user =>(
                <div>
                    {user}
                </div>
            ))} */}
        </div>
    )
}

export default Frequency;