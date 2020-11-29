const peerConnections = {}
const config = {
    iceServers: [
        {
            urls: ["stun:stun.l.google.com:19302"],
        },
    ],
}

const socket = io.connect(window.location.origin, {
    path: "/streams",
    transports: ["websocket"],
})
const video = document.querySelector("video")

// Media contrains
const constraints = {
    video: { facingMode: "user" },
    // Uncomment to enable audio
    // audio: true,
}

// get stream from camera and set it on video.srcObject
navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
        video.srcObject = stream
        socket.emit("broadcaster")
    })
    .catch((error) => console.error(error))

// RTCPeerConnection and adding tracks from stream to peerConnection
socket.on("watcher", (id) => {
    console.log("New watcher : ", id)
    const peerConnection = new RTCPeerConnection(config)
    peerConnections[id] = peerConnection

    let stream = video.srcObject
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

socket.on("answer", (id, description) => {
    console.log("New answer from : ", id)
    peerConnections[id].setRemoteDescription(description)
})

socket.on("candidate", (id, candidate) => {
    console.log("New candidate from : ", id)
    peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
})

socket.on("disconnectPeer", (id) => {
    console.log("Peer disconnected, id: ", id)
    peerConnections[id].close()
    delete peerConnections[id]
})

window.onunload = window.onbeforeunload = () => {
    socket.close()
}
