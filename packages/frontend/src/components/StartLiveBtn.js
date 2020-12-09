import React from "react"
import Button from "react-bootstrap/Button"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useUserInfo } from "../hooks/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faVideo } from "@fortawesome/free-solid-svg-icons"

const StartLiveBtn = (props) => {
    const { accessToken } = useAuthContext()

    const userInfo = useUserInfo()

    const lectureId = props.lectureId

    return (
        <div className="start-live-btn">
            <Button variant="light">
                <FontAwesomeIcon
                    className="recording mr-1"
                    size="sm"
                    icon={faVideo}
                ></FontAwesomeIcon>
                Rozpocznij Live
            </Button>
        </div>
    )
}

export default StartLiveBtn
