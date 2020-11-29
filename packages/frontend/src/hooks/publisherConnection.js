import { useState, useEffect } from "react"
import { useToasts } from "react-toast-notifications"
import socket from "./socket"

function usePublisherConnection({ streamId }) {
    const [clientId, setClientId] = useState(null)
    const viewersPeerConnection = useRef({})
    const { addToast } = useToasts()

    function addPC(id, pc) {
        viewersPeerConnection[id] = pc
    }

    function getPC(id) {
        return viewersPeerConnection[id]
    }

    function removePC(id) {
        delete viewersPeerConnection[id]
    }

    useEffect(() => {
        const stream_url = BASE_URL //+ "/" + streamId
        console.log(`connecting to ${stream_url}`)
        console.log("using publisher connection")
        console.log({ socket })

        function startCall(isCaller, callerId, config) {
            const pc = new PeerConnection(friendID)
                .on("localStream", (src) => {
                    const newState = { callWindow: "active", localSrc: src }
                    if (!isCaller) newState.callModal = ""
                    this.setState(newState)
                })
                .on("peerStream", (src) => this.setState({ peerSrc: src }))
                .start(isCaller, config)
            addPC(callerId, pc)
        }

        function endCall(isCaller, callerId, config) {
            const pc = getPC(id)
            if (_.isFunction(pc.stop)) {
                pc.stop(isStarter)
            }
            removePC(callerId)
        }

        socket.on("init", ({ id: clientId }) => {
            setClientId(clientId)
        })

        socket.on("request", ({ from: callFrom }) => {
            // accept connection
        })

        socket.on("call", (data) => {
            console.log({ data })
            // incoming connection
            /*
            if (data.sdp) {
                this.pc.setRemoteDescription(data.sdp)
                if (data.sdp.type === "offer") this.pc.createAnswer()
            } else this.pc.addIceCandidate(data.candidate)
            */
        })
        socket.on("end", function (data) {
            // implement?
            throw new Error("No implementation yet")
        })
    }, [])

    return response
}

export default usePublisherConnection
