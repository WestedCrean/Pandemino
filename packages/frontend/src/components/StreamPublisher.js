import React, { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVideo } from "@fortawesome/free-solid-svg-icons"
import { Player, ControlBar, VolumeMenuButton } from "video-react"
import { useMediaDevice, usePublisherConnection } from "hooks"
import { useToasts } from "react-toast-notifications"

const StreamPublisher = ({ streamId }) => {
    const { addToast, toastStack } = useToasts()
    const localVideo = useRef(null)
    const mediaDevice = useMediaDevice()
    const response = usePublisherConnection({ streamId })

    const [video, setVideo] = useState(true)

    const toggleMediaDevice = (deviceType) => {
        if (deviceType === "video") {
            setVideo(!video)
            mediaDevice.toggle("Video")
        }
    }

    useEffect(() => {
        console.log(toastStack)
    }, [response])

    return (
        <div className="card border-dark stream-window">
            <div className="card-body p-0">
                <Player
                    id="localVideo"
                    ref={localVideo}
                    fluid
                    autoPlay
                    disableDefaultControls
                />
                <div className="video-control">
                    <button
                        key="btnVideo"
                        type="button"
                        onClick={() => toggleMediaDevice("video")}
                    >
                        <FontAwesomeIcon icon={faVideo} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StreamPublisher
