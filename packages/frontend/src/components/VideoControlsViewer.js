import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faVolumeUp as FullAudio,
    faVolumeDown as QuietAudio,
    faVolumeMute as MuteAudio,
    faExpand as FullScreen,
} from "@fortawesome/free-solid-svg-icons"
import { Dropdown } from "react-bootstrap"

const VideoControlsViewer = ({ audioVolume, onAudioChange, onFullScreen }) => (
    <div className="video-controls">
        <div className="main-controls">
            <button
                id="volume"
                onClick={() => {
                    audioVolume > 0 ? onAudioChange(0) : onAudioChange(100)
                }}
            >
                <FontAwesomeIcon
                    icon={
                        audioVolume > 0
                            ? audioVolume > 50
                                ? FullAudio
                                : QuietAudio
                            : MuteAudio
                    }
                />
            </button>
            <input
                id="input-volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioVolume}
                autocomplete="off"
                role="slider"
                aria-label="Volume"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="100"
                onChange={(event) => {
                    const vol = event.target.value
                    onAudioChange(vol)
                }}
            />
            <button id="fullscreen" onClick={onFullScreen}>
                <FontAwesomeIcon icon={FullScreen} />
            </button>
        </div>
    </div>
)

export default VideoControlsViewer
