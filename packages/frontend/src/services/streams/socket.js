import io from "socket.io-client"

const config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
}

const socketUrl = window.location.origin
const socketPath = "/foo/bar"

function createSocket(namespace) {
    const socket = io.connect(socketUrl, { path: socketPath })

    return socket
}

export { createSocket, config }
