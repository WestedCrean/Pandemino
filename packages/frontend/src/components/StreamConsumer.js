import React, { useState, useRef, useEffect } from "react"
import { createSocket, config } from "services/streams"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay as PlayIcon } from "@fortawesome/free-solid-svg-icons"
import { useToasts } from "react-toast-notifications"
import { VideoControlsViewer } from "components"

const StreamConsumer = ({ socket, streamId }) => {
    const { addToast } = useToasts()
    const peerConnection = useRef()
    const videoRef = useRef(null)
    const [audioVolume, setAudioVolume] = useState(100)

    useEffect(() => {
        console.log({ StreamConsumersocket: socket })
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
            if (peerConnection.current) {
                peerConnection.current
                    .addIceCandidate(new RTCIceCandidate(candidate))
                    .catch((e) => console.error(e))
            }
        })

        socket.on("connect", () => {
            console.log("on connect")
            socket.emit("watcher", streamId)
        })

        socket.on("broadcaster", () => {
            console.log("on broadcaster")
            socket.emit("watcher", streamId)
        })

        socket.on("disconnectPeer", () => {
            console.log("on disconnectPeer")
            if (peerConnection.current) {
                peerConnection.current.close()
            }
        })
    }, [])

    const handleAudioChange = (volume) => {
        setAudioVolume(volume)
    }

    useEffect(() => {
        videoRef.current.volume = audioVolume / 100
    }, [audioVolume])

    const handleFullScreen = (e) => {
        if (document.fullscreenEnabled) {
            try {
                videoRef.current.requestFullscreen()
            } catch (err) {
                addToast("Nie udało się włączyć pełnego ekranu.", {
                    appearance: "warning",
                })
                console.log(err)
            }
            return
        }

        addToast("Pełen ekran nie jest dostępny na tym urządzeniu", {
            appearance: "warning",
        })
    }

    const onCommenceStream = async (e) => {
        const playBtn = document.getElementsByClassName("play-btn-container")[0]
        if (playBtn) {
            playBtn.classList.add("hidden")
        }
    }

    const commenceStream = async (e) => {
        console.log("click!")
        e.preventDefault()
        onCommenceStream()
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
                        onCanPlay={onCommenceStream}
                        autoPlay
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
