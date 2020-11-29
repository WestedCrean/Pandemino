let peerConnection
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

// onOffer set local stream to whatever peerConnection.ontrack brings
socket.on("offer", (id, description) => {
    console.log("Offer, id: ", id)
    peerConnection = new RTCPeerConnection(config)
    peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
            socket.emit("answer", id, peerConnection.localDescription)
        })
    peerConnection.ontrack = (event) => {
        console.log("Track from pc")
        video.srcObject = event.streams[0]
    }
    peerConnection.onicecandidate = (event) => {
        console.log("New ice candidate")
        if (event.candidate) {
            socket.emit("candidate", id, event.candidate)
        }
    }
})

socket.on("candidate", (id, candidate) => {
    console.log("Add addIceCandidate")
    peerConnection
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
    peerConnection.close()
})

window.onunload = window.onbeforeunload = () => {
    socket.close()
}
