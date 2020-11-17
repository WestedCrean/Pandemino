import React, { Fragment, useEffect, useState } from "react"
import { withRouter } from "react-router"

import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import { getStreamRole } from "services/streams"
import { useToasts } from "react-toast-notifications"

import { useUserInfo } from "hooks"
import { StreamWindow, Chat, StreamInfo } from "components"

import Files from "components/Files"

const Lecture = ({ history, location }) => {
    const { accessToken } = useAuthContext()
    const { addToast, toastStack } = useToasts()
    const userInfo = useUserInfo()
    const userRole = getStreamRole(userInfo)
    const lectureId = location.pathname.split("/").slice(-1)[0]
    const [streamInfo, setStreamInfo] = useState({
        id: 2,
        name: "Metoda najmniejszych kwadratów",
        description: "Lorem ipsum dolor sit amet",
        url: "/asdf",
        views: 14,
        createdAt: "2020-11-14T14:07:05.898Z",
        lecturer: "dr Edyta Lukasik",
        isLive: true,
    })

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
        <div className="container-md py-5">
            <div className="row py-5">
                <div className="col-sm-12 col-md-8">
                    <div className="row">
                        <div className="col-sm-12 pb-4">
                            <StreamWindow
                                role={"publisher"}
                                streamId={lectureId}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            {streamInfo && <StreamInfo {...streamInfo} />}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-2">
                    <Chat />
                </div>
                <div className="col-sm-12 col-md-2">
                    <Files/>

                </div>
            </div>
        </div>
    )
}

export default withRouter(Lecture)
