import React, { useState, useEffect, useRef, Fragment } from "react"
import { VideoControls } from "components"
import { useToasts } from "react-toast-notifications"
import { createSocket, config } from "services/streams"

const calculateStreamHeight = () => {
    let height = window.innerHeight * 0.5
    height = 360
    return { min: height, max: 1080, ideal: 720 }
}

const StreamPublisher = ({ streamId }) => {
    const { addToast, toastStack } = useToasts()
    /* demo start */
    const videoRef = useRef(null)
    const socket = createSocket()
    const audioSource = useRef(null)
    const videoSource = useRef(null)
    const peerConnections = useRef({})
    /* demo end */

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
    //const mediaDevice = useMediaDevice(cameraConfig)
    const [streaming, setStreaming] = useState(false)
    const [video, setVideo] = useState(true)
    const [audio, setAudio] = useState(true)

    const toggleMediaDevice = (deviceType) => {
        if (deviceType === "video") {
            setVideo(!video)
            //mediaDevice.toggle("Video")
        }
        if (deviceType === "audio") {
            setAudio(!audio)
            //mediaDevice.toggle("Audio")
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

    /*
    if (mediaDevice && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaDevice
    }
    */

    const commenceStream = () => {
        videoRef.current.play()
        setStreaming(true)
    }

    function getDevices() {
        return navigator.mediaDevices.enumerateDevices()
    }

    function handleDevices(deviceInfos) {
        window.deviceInfos = deviceInfos
        for (const deviceInfo of deviceInfos) {
            const option = document.createElement("option")
            option.value = deviceInfo.deviceId
            if (deviceInfo.kind === "audioinput") {
                option.text =
                    deviceInfo.label ||
                    `Microphone ${audioSource.current.length + 1}`
                audioSource.current.appendChild(option)
            } else if (deviceInfo.kind === "videoinput") {
                option.text =
                    deviceInfo.label ||
                    `Camera ${videoSource.current.length + 1}`
                videoSource.current.appendChild(option)
            }
        }
    }

    const getStream = () => {
        if (window.stream) {
            window.stream.getTracks().forEach((track) => {
                track.stop()
            })
        }
        const audio = audioSource.current.value
        const video = videoSource.current.value
        const constraints = {
            audio: { deviceId: audio ? { exact: audio } : undefined },
            video: { deviceId: video ? { exact: video } : undefined },
        }
        return navigator.mediaDevices
            .getUserMedia(constraints)
            .then(handleStream)
            .catch(handleError)
    }

    const handleStream = (stream) => {
        window.stream = stream
        audioSource.current.selectedIndex = [
            ...audioSource.current.options,
        ].findIndex(
            (option) => option.text === stream.getAudioTracks()[0].label
        )
        videoSource.current.selectedIndex = [
            ...videoSource.current.options,
        ].findIndex(
            (option) => option.text === stream.getVideoTracks()[0].label
        )
        videoRef.current.srcObject = stream
        socket.emit("broadcaster")
    }

    const handleError = (error) => {
        console.error("Error: ", error)
    }

    useEffect(() => {
        socket.on("candidate", (id, candidate) => {
            if (peerConnections.current[id]) {
                peerConnections.current[id].addIceCandidate(
                    new RTCIceCandidate(candidate)
                )
            }
        })

        socket.on("disconnectPeer", (id) => {
            peerConnections.current[id].close()
            delete peerConnections.current[id]
        })

        socket.on("answer", (id, description) => {
            if (peerConnections.current[id]) {
                peerConnections.current[id].setRemoteDescription(description)
            }
        })

        socket.on("watcher", (id) => {
            const peerConnection = new RTCPeerConnection(config)

            peerConnections.current[id] = peerConnection

            const stream = videoRef.current.srcObject
            stream
                .getTracks()
                .forEach((track) => peerConnection.addTrack(track, stream))

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("candidate", id, event.candidate)
                }
            }

            peerConnection
                .createOffer()
                .then((sdp) => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    socket.emit("offer", id, peerConnection.localDescription)
                })
        })

        getStream().then(getDevices).then(handleDevices)

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <Fragment>
            <div className="card border-dark stream-window">
                <div className="card-body p-0">
                    <div className="video-container">
                        <video
                            style={{ width: "100%" }}
                            id="videoRef"
                            ref={videoRef}
                            onCanPlay={commenceStream}
                            autoPlay
                            playsInline
                            disableDefaultControls
                        ></video>

                        <VideoControls
                            isPlaying={true}
                            audio={audio}
                            video={video}
                            toggleMediaDevice={toggleMediaDevice}
                            togglePlayPause={togglePlayPause}
                            toggleScreenCapture={toggleScreenCapture}
                        />
                    </div>
                </div>
            </div>
            <section className="select">
                <label for="audioSource">Audio source: </label>
                <select
                    id="audioSource"
                    ref={audioSource}
                    onChange={getStream}
                ></select>
            </section>

            <section className="select">
                <label for="videoSource">Video source: </label>
                <select
                    id="videoSource"
                    ref={videoSource}
                    onChange={getStream}
                ></select>
            </section>
        </Fragment>
    )
}

export default StreamPublisher
