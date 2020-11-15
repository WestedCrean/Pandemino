import React, { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faVideo as VideoOn,
    faVideoSlash as VideoOff,
    faPauseCircle as PauseIcon,
    faPlay as PlayIcon,
    faMicrophone as MicOn,
    faMicrophoneSlash as MicOff,
} from "@fortawesome/free-solid-svg-icons"
import { Player, ControlBar, VolumeMenuButton } from "video-react"
import { useMediaDevice, usePublisherConnection, useTimer } from "hooks"
import { VideoControls } from "components"
import { useToasts } from "react-toast-notifications"

const calculateStreamHeight = () => {
    let height = window.innerHeight * 0.5
    height = 360
    return { min: height, max: 1080, ideal: 720 }
}
const StreamPublisher = ({ mediaStreamId }) => {
    const { addToast, toastStack } = useToasts()
    const [heightDimensions, setHeightDimensions] = useState(
        calculateStreamHeight()
    )
    const [cameraConfig, setCameraConfig] = useState({
        video: {
            facingMode: "user",
            height: { ...heightDimensions },
        },
        audio: true,
    })
    const localVideoRef = useRef(null)
    const mediaStream = useMediaDevice(cameraConfig)

    const response = usePublisherConnection({ mediaStreamId })

    const [streaming, setStreaming] = useState(false)
    const [video, setVideo] = useState(true)
    const [audio, setAudio] = useState(true)

    // FIXME: stream time should be counted server side and sent using websocket
    const time = useTimer(streaming)

    const toggleMediaDevice = (deviceType) => {
        if (deviceType === "video") {
            setVideo(!video)
            // FIXME: videotrack could also be stream from desktop!
            const videoTrack = mediaStream.getVideoTracks()[0]
            videoTrack.enabled = !videoTrack.enabled
            addToast(`Video ${videoTrack.enabled ? "enabled" : "disabled"}`, {
                appearance: "info",
            })
        }
        if (deviceType === "audio") {
            setAudio(!audio)
            const audioTrack = mediaStream.getAudioTracks()[0]
            audioTrack.enabled = !audioTrack.enabled
            addToast(`Audio ${audioTrack.enabled ? "enabled" : "disabled"}`, {
                appearance: "info",
            })
        }
    }

    const togglePlayPause = () => {
        addToast("Pausing stream is not implemented yet", {
            appearance: "warning",
        })
    }

    const toggleScreenCapture = () => {
        addToast("Screen capture is not implemented yet", {
            appearance: "warning",
        })
    }

    if (
        mediaStream &&
        localVideoRef.current &&
        !localVideoRef.current.srcObject
    ) {
        console.log("time to play kurwa")
        localVideoRef.current.srcObject = mediaStream
    }

    const commenceStream = () => {
        localVideoRef.current.play()
        setStreaming(true)
    }

    return (
        <div className="card border-dark stream-window">
            <div className="card-body p-0">
                {/*
                <Player
                    id="localVideoRef"
                    ref={localVideoRef}
                    onCanPlay={handlePlay}
                    fluid
                    autoPlay
                    playsInline
                    disableDefaultControls
                ></Player>
                */}
                <div className="video-container">
                    <video
                        style={{ width: "100%" }}
                        id="localVideoRef"
                        ref={localVideoRef}
                        onCanPlay={commenceStream}
                        autoPlay
                        playsInline
                        disableDefaultControls
                    ></video>
                    <VideoControls
                        isPlaying={true}
                        time={time}
                        audio={audio}
                        video={video}
                        toggleMediaDevice={toggleMediaDevice}
                        togglePlayPause={togglePlayPause}
                        toggleScreenCapture={toggleScreenCapture}
                    />
                </div>
            </div>
        </div>
    )
}

export default StreamPublisher
