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
import { Dropdown } from "react-bootstrap"

const VideoControls = ({
    isPlaying,
    time,
    video,
    audio,
    devices,
    handleDeviceChange,
    toggleMediaDevice,
    togglePlayPause,
    toggleScreenCapture,
}) => (
    <div className="video-controls">
        <div className="main-controls">
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
        </div>
        <div className="dropdownMenu">
            <Dropdown className="bg-transparent text-dark">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Wybierz źródła
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.ItemText>
                        <section className="select">
                            <label htmlFor="audioSource">
                                Źródło dźwięku:{" "}
                            </label>
                            <select id="audioSource">
                                {devices.map((i, device) => {
                                    return (
                                        device.kind === "audioinput" && (
                                            <option
                                                onClick={() => {
                                                    handleDeviceChange(
                                                        device.kind,
                                                        device.id
                                                    )
                                                }}
                                            >
                                                {device.label}
                                            </option>
                                        )
                                    )
                                })}
                            </select>
                        </section>
                    </Dropdown.ItemText>
                    <Dropdown.ItemText>
                        <section className="select">
                            <label htmlFor="videoSource">Źródło obrazu: </label>
                            <select id="videoSource">
                                {devices.map((i, device) => {
                                    return (
                                        device.kind === "videoinput" && (
                                            <option
                                                onClick={() => {
                                                    handleDeviceChange(
                                                        device.kind,
                                                        device.id
                                                    )
                                                }}
                                            >
                                                {device.label}
                                            </option>
                                        )
                                    )
                                })}
                            </select>
                        </section>
                    </Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
)

export default VideoControls
