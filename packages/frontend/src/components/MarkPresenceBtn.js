import React from 'react'
import Button from "react-bootstrap/Button"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import {useUserInfo} from "../hooks/user"


const MarkPresenceBtn = (props) => {

    const { accessToken } = useAuthContext()

    const userInfo = useUserInfo()
    
    const lectureId = props.lectureId
    const MarkPresence = async () =>{

        const api = ApiService(accessToken)
        try{
            const resopnse = await api.findLectureFrequencyByUserLecture(userInfo.id, lectureId)
            if(resopnse.data === null){

                try{
                    const body = {
                        userId: userInfo.id,
                        lectureId: lectureId,
                        status: 1
                    }

                    const reponse2 = await api.postLectureFrequency(body)

                    window.alert("Jestes obecny")
                }catch(error){console.log(error)}
            } else {
                window.alert("Zarejestrowales juz swoja obecnosc")
            }
        }catch(error){console.log(error)}

    }

    return (

        <div>
            <Button onClick={()=>MarkPresence()}>
                Zaznacz obecność
            </Button>
        </div>
    )


}

export default MarkPresenceBtn