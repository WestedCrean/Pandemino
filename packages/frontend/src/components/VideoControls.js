import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faVideo as VideoOn,
    faVideoSlash as VideoOff,
    faPauseCircle as PauseIcon,
    faPlay as PlayIcon,
    faMicrophone as MicOn,
    faMicrophoneSlash as MicOff,
    faDesktop as ScreenCapture,
} from "@fortawesome/free-solid-svg-icons"

function getTimeString(time) {
    let hours = parseInt(time / 3600)
    time = time % 3600
    let minutes = parseInt(time / 60)
    time = time % 60
    let seconds = time
    return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}` // FIXME: dirty hack
}

const VideoControls = ({
    isPlaying,
    time,
    video,
    audio,
    toggleMediaDevice,
    togglePlayPause,
    toggleScreenCapture,
}) => (
    <div className="video-controls">
        <button
            key="toggleStreamButton"
            type="button"
            onClick={() => togglePlayPause()}
        >
            {isPlaying ? (
                <FontAwesomeIcon icon={PlayIcon} />
            ) : (
                <FontAwesomeIcon icon={PauseIcon} />
            )}
        </button>

        <button
            key="toggleVideoButton"
            type="button"
            onClick={() => toggleMediaDevice("video")}
        >
            {video ? (
                <FontAwesomeIcon icon={VideoOn} />
            ) : (
                <FontAwesomeIcon icon={VideoOff} />
            )}
        </button>

        <button
            key="toggleAudioButton"
            type="button"
            onClick={() => toggleMediaDevice("audio")}
        >
            {audio ? (
                <FontAwesomeIcon icon={MicOn} />
            ) : (
                <FontAwesomeIcon icon={MicOff} />
            )}
        </button>

        <button
            key="toggleScreenCapture"
            type="button"
            onClick={() => toggleScreenCapture()}
        >
            {<FontAwesomeIcon icon={ScreenCapture} />}
        </button>
        <span className="time-counter">{getTimeString(time)}</span>
    </div>
)

export default VideoControls
