import React from "react"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"

const GoToLiveStreamBtn = ({ link, currentState, lectureId }) => {
    const history = useHistory()
    return (
        <div>
            {currentState ? (
                <Button
                    variant="light"
                    onClick={() => {
                        history.push(link)
                    }}
                >
                    <FontAwesomeIcon
                        className="recording mr-1"
                        size="sm"
                        icon={faArrowCircleRight}
                    ></FontAwesomeIcon>
                    Idź do wykładu live
                </Button>
            ) : (
                <React.Fragment />
            )}
        </div>
    )
}

export default GoToLiveStreamBtn
