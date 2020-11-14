import { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import { useToasts } from "react-toast-notifications"

const BASE_URL = "/streams"

function useConsumerConnection({ streamId }) {
    const [response, setResponse] = useState("")
    const { addToast } = useToasts()

    useEffect(() => {
        const socket = socketIOClient(`/streams/${streamId}`)
        console.log("using consumer connection")
        socket.on("connect", function () {
            console.log("connected")
            addToast("Connected", { appearance: "success" })
            socket.emit("events", { test: "test" })
            socket.emit("identity", 0, (response) =>
                console.log("Identity:", response)
            )
        })

        socket.on("disconnect", function () {
            console.log("disconnect")
            setResponse("Disconnected", { appearance: "warning" })
        })

        socket.on("events", function (data) {
            console.log("event", data)
        })
        socket.on("exception", function (data) {
            console.log("exception")
            setResponse("Exception", { appearance: "error" })
            console.log("event", data)
        })
    }, [])

    return response
}

export default useConsumerConnection
