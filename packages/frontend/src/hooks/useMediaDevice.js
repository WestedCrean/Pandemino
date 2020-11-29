import { useState, useEffect } from "react"
import { useToasts } from "react-toast-notifications"
import MediaDevice from "./MediaDevice"

function useMediaDevice(constraints) {
    const { addToast } = useToasts()
    const [mediaDevice, setMediaDevice] = useState(null)

    const createMediaDevice = async () => {
        try {
            // or MediaDevices.getUserMedia(constraints)
            const md = MediaDevice.create(contraints)
            setMediaDevice(md)
            addToast("Created stream!", { appearance: "success" })
        } catch (e) {
            let msg = ""

            if (encodeURI.name === "ConstraintNotSatisfiedError") {
                msg =
                    "The resolution " +
                    constraints.video.width.exact +
                    "x" +
                    constraints.video.height.exact +
                    " px is not supported by your device."
            } else if (e.name === "PermissionDeniedError") {
                msg = "Permission to use your camera has not been granted."
            } else if (e.name === "NotFoundError") {
                msg = "Your browser does not have access to a camera."
            } else {
                msg = `MediaDevice ${e.name}. See console for more details.`
                console.log(e)
            }
            addToast(msg, { appearance: "error" })
        }
    }

    useEffect(() => {
        if (!mediaDevice) {
            createMediaDevice()
        } else {
            return function cleanup() {
                mediaDevice.getTracks().forEach((track) => {
                    track.stop()
                })
            }
        }
    }, [mediaDevice, constraints])

    return mediaDevice
}

export { useMediaDevice }
