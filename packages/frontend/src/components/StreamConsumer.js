import React, { useState, useRef, useEffect } from "react"
import { createSocket, config } from "services/streams"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay as PlayIcon } from "@fortawesome/free-solid-svg-icons"
import { VideoControlsViewer } from "components"

const StreamConsumer = ({ streamId }) => {
    console.log("Using stream consumer (component)")

    const peerConnection = useRef()
    const videoRef = useRef(null)
    const socket = createSocket()

    const [audioVolume, setAudioVolume] = useState(100)

    useEffect(() => {
        socket.on("offer", (id, description) => {
            console.log("on offer")
            peerConnection.current = new RTCPeerConnection(config)
            peerConnection.current
                .setRemoteDescription(description)
                .then(() => peerConnection.current.createAnswer())
                .then((sdp) => peerConnection.current.setLocalDescription(sdp))
                .then(() => {
                    socket.emit(
                        "answer",
                        id,
                        peerConnection.current.localDescription
                    )
                })
            peerConnection.current.ontrack = (event) => {
                videoRef.current.srcObject = event.streams[0]
            }
            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("candidate", id, event.candidate)
                }
            }
        })

        socket.on("candidate", (id, candidate) => {
            console.log("on candidate")
            peerConnection.current
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch((e) => console.error(e))
        })

        socket.on("connect", () => {
            console.log("on connect")
            socket.emit("watcher")
        })

        socket.on("broadcaster", () => {
            console.log("on broadcaster")
            socket.emit("watcher")
        })

        socket.on("disconnectPeer", () => {
            console.log("on disconnectPeer")
            peerConnection.current.close()
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const handleAudioChange = (volume) => {
        console.log(volume)
        setAudioVolume(volume)
    }

    useEffect(() => {
        videoRef.current.volume = audioVolume / 100
    }, [audioVolume])

    const handleFullScreen = (e) => {
        alert("not implemented")
    }

    const commenceStream = async (e) => {
        console.log("click!")
        e.preventDefault()
        document
            .getElementsByClassName("play-btn-container")[0]
            .classList.add("hidden")
        videoRef.current.play().catch((er) => {
            console.log("chrome error: ", er.message)
        })
    }

    return (
        <div className="card border-dark stream-window">
            <div className="card-body p-0">
                <div className="video-container">
                    <div className="play-btn-container">
                        <div className="play-btn" onClick={commenceStream}>
                            <FontAwesomeIcon icon={PlayIcon} />
                        </div>
                    </div>
                    <video
                        style={{ width: "100%" }}
                        id="videoRef"
                        ref={videoRef}
                        playsInline
                    />
                    <VideoControlsViewer
                        audioVolume={audioVolume}
                        onAudioChange={handleAudioChange}
                        onFullScreen={handleFullScreen}
                    />
                </div>
            </div>
        </div>
    )
}

export default StreamConsumer
