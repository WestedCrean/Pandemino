import React, { Fragment, useEffect, useState } from "react"
import { withRouter } from "react-router"

import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import { useToasts } from "react-toast-notifications"
import { createSocket } from "services/streams"

import { StreamWindow, Chat, StreamInfo } from "components"
import { hi } from "date-fns/locale"

const Lecture = ({ history, location }) => {
    const { accessToken } = useAuthContext()
    const { addToast } = useToasts()
    const courseId = location.pathname.split("/")[2]
    const [streamInfo, setStreamInfo] = useState(null)
    const [socket, setSocket] = useState(createSocket(courseId))
    const api = ApiService(accessToken)

    const getStreamInfo = async () => {
        try {
            const { data } = await api.getCourseById(courseId)
            let { liveLecture, lecturer } = data
            liveLecture.lecturer = lecturer
            console.log({ liveLecture })
            if (liveLecture) {
                //const response = await api.getStreamById(liveLecture.id)
                setStreamInfo(liveLecture)
            } else {
                addToast(
                    "Wykład na żywo jeszcze się nie rozpoczął. Zostaniesz przeniesiony do widoku kursu.",
                    { appearance: "error" }
                )
                setTimeout(() => {
                    //history.push(`/course/${courseId}`)
                    history.push("/")
                }, 3000)
            }
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
                                streamId={courseId}
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
                        roomId={courseId}
                        ready={socket !== undefined}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Lecture)
