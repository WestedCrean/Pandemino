import React, { useState, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from "@fortawesome/free-solid-svg-icons"

const StreamPublisher = ({ localSrc, config, mediaDevice }) => {
    const localVideo = useRef(null);
    const [video, setVideo] = useState(config.video)

    const getMediaDevice = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            var videoTracks = stream.getVideoTracks();
            console.log('Got stream with constraints:', constraints);
            console.log('Using video device: ' + videoTracks[0].label);
            stream.onremovetrack = function () {
                console.log('Stream ended');
            };
            window.stream = stream; // make variable available to browser console
            localVideo = stream
        } catch (e) {
            if (error.name === 'ConstraintNotSatisfiedError') {
                console.log('The resolution ' + constraints.video.width.exact + 'x' +
                    constraints.video.height.exact + ' px is not supported by your device.');
            } else if (error.name === 'PermissionDeniedError') {
                console.log('Permissions have not been granted to use your camera and ' +
                    'microphone, you need to allow the page access to your devices in ' +
                    'order for the demo to work.');
            }
            console.log('getUserMedia error: ' + error.name, error);
        }
    }

    useEffect(() => {
        if (localVideo.current && localSrc) localVideo.current.srcObject = localSrc;
    });

    useEffect(() => {
        if (mediaDevice) {
            mediaDevice.toggle('Video', video);
        }
    });

    const toggleMediaDevice = (deviceType) => {
        if (deviceType === 'video') {
            setVideo(!video);
            mediaDevice.toggle('Video');
        }
    };

    return (
        <div className="card border-dark mb-3 stream-window">
            <div class="card-body">
                <video id="localVideo" ref={localVideo} autoPlay muted />
                <div class="video-control">
                    <button
                        key="btnVideo"
                        type="button"
                        onClick={() => toggleMediaDevice('video')}
                    >
                        <FontAwesomeIcon icon={faVideo} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StreamPublisher