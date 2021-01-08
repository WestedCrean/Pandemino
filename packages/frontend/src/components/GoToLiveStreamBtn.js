import React from "react"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"

const GoToLiveStreamBtn = ({ lectureId }) => {
    const history = useHistory()
    return (
        <div className="start-live-btn">
            <Button
                variant="light"
                onClick={() => {
                    history.push("/lec")
                }}
            >
                <FontAwesomeIcon
                    className="recording mr-1"
                    size="sm"
                    icon={faArrowCircleRight}
                ></FontAwesomeIcon>
                {`Idź do wykładu ${lectureId}`}
            </Button>
        </div>
    )
}

export default GoToLiveStreamBtn
