import { useState, useEffect } from "react"
import ApiService from "services/api"
import { useToasts } from "react-toast-notifications"

function useMediaDevice(callback) {
    const { addToast } = useToasts()

    const [mediaDevice, setMediaDevice] = useState({})
    var config = {
        video: true,
        audio: true,
    }
    const createMediaDevice = async () => {
        try {
            const md = await navigator.mediaDevices.getUserMedia(config)
            setMediaDevice(md)
            callback("Created stream!")
        } catch (e) {
            let msg = ""

            if (encodeURI.name === "ConstraintNotSatisfiedError") {
                msg =
                    "The resolution " +
                    config.video.width.exact +
                    "x" +
                    config.video.height.exact +
                    " px is not supported by your device."
            } else if (e.name === "PermissionDeniedError") {
                msg = "Permission to use your camera has not been granted."
            } else if (e.name === "NotFoundError") {
                msg = "Your browser does not have access to the camera."
            } else {
                msg = `MediaDevice error: ${e.name}. See console for more details.`
                console.log(e)
            }
            addToast(msg, { appearance: "error" })
        }
    }
    useEffect(() => {
        createMediaDevice()
    }, [])

    return mediaDevice
}

export { useMediaDevice }
