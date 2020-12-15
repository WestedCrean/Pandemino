import React, { useState, useEffect, useRef, Fragment } from "react"
import { VideoControls } from "components"
import { useToasts } from "react-toast-notifications"
import { createSocket, config } from "services/streams"

const calculateStreamHeight = () => {
    let height = window.innerHeight * 0.5
    height = 360
    return { min: height, max: 1080, ideal: 720 }
}

const StreamPublisher = ({ socket, streamId, ready }) => {
    const { addToast, toastStack } = useToasts()
    /* demo start */
    const videoRef = useRef(null)
    const [audioSource, setAudioSource] = useState(null)
    const [videoSource, setVideoSource] = useState(null)
    const [screenCapture, setScreenCapture] = useState(false)
    const [streamConstraints, setConstraints] = useState({
        audio: {
            deviceId: audioSource ? { exact: audioSource } : undefined,
        },
        video: {
            deviceId: audioSource ? { exact: audioSource } : undefined,
        },
    })

    const [availableDevices, setAvailableDevices] = useState([])
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
    const [video, setVideo] = useState(true)
    const [audio, setAudio] = useState(true)

    const toggleMediaDevice = (deviceType) => {
        if (deviceType === "video") {
            setVideo(!video)
            window.stream.getVideoTracks().forEach((track) => {
                track["enabled"] = !video
            })
        }
        if (deviceType === "audio") {
            setAudio(!audio)
            window.stream.getAudioTracks().forEach((track) => {
                track["enabled"] = !video
            })
        }
    }

    useEffect(() => {}, [audio, video])

    const togglePlayPause = () => {
        addToast("Pauza ", {
            appearance: "warning",
        })
    }

    async function getDevices() {
        return navigator.mediaDevices.enumerateDevices()
    }

    function handleDevices(deviceInfos) {
        console.log("handling devices")
        window.deviceInfos = deviceInfos
        const devices = deviceInfos.map((deviceInfo, i) => {
            return {
                label:
                    deviceInfo.label ||
                    (deviceInfo.kind === "audioinput"
                        ? `Mikrofon ${i + 1}`
                        : `Kamera ${i + 1}`),
                kind: deviceInfo.kind,
                id: deviceInfo.deviceId,
            }
        })
        setAvailableDevices(devices)
    }

    function handleDeviceChange(type, deviceId) {
        if (type === "audioinput") {
            setAudioSource(deviceId)
        }
        if (type === "videoinput") {
            setVideoSource(deviceId)
        }
    }

    const getStream = async () => {
        console.log("getting stream")
        if (window.stream) {
            window.stream.getTracks().forEach((track) => {
                track.stop()
            })
        }

        let captureStream = null
        try {
            captureStream = await navigator.mediaDevices.getUserMedia(
                streamConstraints
            )
        } catch (err) {
            console.log({ getstreamErr: err })
        }
        console.log({ captureStream })
        return captureStream
    }

    const handleStream = (stream) => {
        console.log("handling stream")
        try {
            window.stream = stream
            videoRef.current.srcObject = stream
            stream.getTracks().forEach((track) => {
                Object.keys(peerConnections.current).forEach((connectionId) => {
                    peerConnections.current[connectionId].addTrack(
                        track,
                        stream
                    )
                })
            })

            socket.emit("broadcaster", streamId)
        } catch (e) {
            console.log(e)
        }
    }

    const handleConstraintsChange = () => {
        //setConstraints()
    }

    const handleError = (error) => {
        console.error("Error: ", error)
    }

    useEffect(() => {
        socket.on("candidate", (id, candidate) => {
            console.log("on candidate")
            if (peerConnections.current[id]) {
                peerConnections.current[id].addIceCandidate(
                    new RTCIceCandidate(candidate)
                )
            }
        })

        socket.on("disconnectPeer", (id) => {
            console.log("on disconnectPeer")
            try {
                peerConnections[id].close()
            } catch (e) {
                console.log(e)
            }

            delete peerConnections.current[id]
        })

        socket.on("answer", (id, description) => {
            console.log("on answer")
            if (peerConnections.current[id]) {
                peerConnections.current[id].setRemoteDescription(description)
            }
        })

        socket.on("watcher", (id) => {
            console.log("on watcher")
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
    }, [])

    const streamHandler = async () => {
        handleStream(await getStream())
        handleDevices(await getDevices())
    }

    const toggleScreenCapture = async () => {
        if (screenCapture) {
            setScreenCapture(false)
            streamHandler()
        } else {
            try {
                let stream = await navigator.mediaDevices.getDisplayMedia(
                    streamConstraints
                )
                videoRef.current.srcObject = stream
                handleStream(stream)
                setScreenCapture(true)
            } catch (err) {
                addToast("Udostępnienie ekranu nie powiodło się", {
                    appearance: "warning",
                })
            }
        }
    }

    useEffect(() => {
        streamHandler()
    }, [audioSource, videoSource])

    const commenceStream = async () => {
        videoRef.current.play()
    }

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
                        ></video>

                        <VideoControls
                            isPlaying={true}
                            audio={audio}
                            video={video}
                            devices={availableDevices}
                            handleDeviceChange={handleDeviceChange}
                            toggleMediaDevice={toggleMediaDevice}
                            togglePlayPause={togglePlayPause}
                            toggleScreenCapture={toggleScreenCapture}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StreamPublisher
