import { useState, useEffect } from 'react';
import ApiService from "services/api"

function useMediaDevice(callback) {
    const [mediaDevice, setMediaDevice] = useState({});
    var config = {
        "video": true,
        "audio": true
    }
    const createMediaDevice = async () => {
        try {
            const md = await navigator.mediaDevices.getUserMedia(config)
            setMediaDevice(md)
            callback('Created stream!');
        } catch (e) {
            if (encodeURI.name === 'ConstraintNotSatisfiedError') {
                callback('The resolution ' + config.video.width.exact + 'x' +
                    config.video.height.exact + ' px is not supported by your device.');
            } else if (e.name === 'PermissionDeniedError') {
                callback('Permission to use your camera has not been granted.');
            } else if (e.name === "NotFoundError") {
                callback("Your browser does not have access to the camera.")
            } else {
                callback(`getUserMedia error: ${e.name}. See console for more details.`)
                console.log(e)
            }
        }

    }
    useEffect(() => {
        createMediaDevice()
    }, []);



    return mediaDevice;
}

export { useMediaDevice }