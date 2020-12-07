import React, { Fragment, useEffect, useState } from "react"
import { withRouter } from "react-router"

import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import { useToasts } from "react-toast-notifications"
import { createSocket } from "services/streams"

import { StreamWindow, Chat, StreamInfo } from "components"

const Lecture = ({ history, location }) => {
    const { accessToken } = useAuthContext()
    const { addToast } = useToasts()
    const lectureId = location.pathname.split("/").slice(-1)[0]
    const [streamInfo, setStreamInfo] = useState(null)
    const [socket, setSocket] = useState(createSocket(lectureId))
    const api = ApiService(accessToken)

    const getStreamInfo = async () => {
        try {
            const response = await api.getStreamById(lectureId)
            setStreamInfo(response.data)
        } catch (error) {
            addToast("Błąd połączenia z serwerem", { appearance: "error" })
        }
    }

    useEffect(() => {
        getStreamInfo()
    }, [])

    return (
        <div className="container py-5">
            <div className="row py-5">
                <div className="col-sm-12 col-md-8">
                    <div className="row">
                        <div className="col-sm-12 pb-4">
                            <StreamWindow
                                socket={socket}
                                streamInfo={streamInfo}
                                streamId={lectureId}
                                ready={socket !== undefined}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <StreamInfo {...streamInfo} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4">
                    <Chat
                        socket={socket}
                        roomId={lectureId}
                        ready={socket !== undefined}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Lecture)
