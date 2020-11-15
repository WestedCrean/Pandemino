import { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import { useToasts } from "react-toast-notifications"

const BASE_URL = "http://127.0.0.1:5050/streams"

function usePublisherConnection({ streamId }) {
    const [response, setResponse] = useState("")
    const { addToast } = useToasts()

    useEffect(() => {
        const socket = socketIOClient(BASE_URL, { transports: ["websocket"] })
        console.log("using publisher connection")
        console.log({ socket })

        socket.emit("events", "okay")
        socket.on("events", function (data) {
            setResponse("Received an event!")
            console.log("event response", data)
        })

        socket.on("connect", function () {
            setResponse("Connected")
        })
        socket.on("event", function (data) {
            addToast(`Event data: ${data}`, { appearance: "success" })
        })
        socket.on("disconnect", function () {
            setResponse("Disconnected")
        })
    }, [])

    return response
}

export default usePublisherConnection
