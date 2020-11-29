import React, { useEffect, useRef } from "react"
import { Player, ControlBar, VolumeMenuButton } from "video-react"
import { useMediaDevice, usePublisherConnection, useTimer } from "hooks"
import { VideoControls } from "components"
import { useToasts } from "react-toast-notifications"
import io from "socket.io-client"

const StreamConsumer = ({ streamId }) => {
    console.log("Using stream consumer (component)")

    const videoRef = useRef()
    const peerConnection = useRef()
    const socket = useRef()
    const config = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
            // {
            //   "urls": "turn:TURN_IP?transport=tcp",
            //   "username": "TURN_USERNAME",
            //   "credential": "TURN_CREDENTIALS"
            // }
        ],
    }

    useEffect(() => {
        socket = io.connect(window.location.origin)
        socket.on("offer", (id, description) => {
            console.log("offer event")
            var pc = new RTCPeerConnection(config)
            pc.setRemoteDescription(description)
                .then(() => pc.createAnswer())
                .then((sdp) => pc.setLocalDescription(sdp))
                .then(() => {
                    socket.emit("answer", id, pc.localDescription)
                })
            pc.ontrack = (event) => {
                videoRef.current.srcObject = event.streams[0]
            }
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("candidate", id, event.candidate)
                }
            }

            peerConnection = pc
        })

        socket.on("candidate", (id, candidate) => {
            peerConnection.current
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch((e) => console.error(e))
        })

        socket.on("connect", () => {
            socket.emit("watcher")
        })

        socket.on("broadcaster", () => {
            socket.emit("watcher")
        })

        socket.on("disconnectPeer", () => {
            peerConnection.current.close()
        })

        return () => {
            console.log("Closing socket")
            socket.close()
        }
    }, [])

    return (
        <div className="card border-dark stream-window">
            <div className="card-body p-0">
                <div className="video-container">
                    <video
                        style={{ width: "100%" }}
                        id="remoteVideoRef"
                        ref={videoRef}
                        autoPlay
                        playsInline
                        disableDefaultControls
                    ></video>
                </div>
            </div>
        </div>
    )
}

export default StreamConsumer
