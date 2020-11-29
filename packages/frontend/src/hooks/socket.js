import io from "socket.io-client"

const BASE_URL = "https://localhost:5050"

const socket = io(BASE_URL, { path: "/streams" })

export default socket
