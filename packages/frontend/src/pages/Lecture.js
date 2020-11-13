import React, { Fragment, useEffect, useState } from 'react'
import { withRouter } from 'react-router'

import ApiService from "services/api"
import { useAuthContext } from 'services/auth'
import { getStreamRole } from 'services/streams'
import { useToasts } from 'react-toast-notifications'

import { useUserInfo } from 'hooks'
import { StreamWindow, Chat, LiveBadge, StreamInfo } from 'components'

const Lecture = ({ history, location }) => {
    const { accessToken } = useAuthContext()
    const userInfo = useUserInfo()
    const userRole = getStreamRole(userInfo)
    const lectureId = location.pathname.split("/")[1]
    const [streamInfo, setStreamInfo] = useState({
        "title": "Metoda najmniejszych kwadratów",
        "id": "2",
        "url": "/asdf",
        "lecturer": "dr Edyta Lukasik",
        "isLive": true,
        "description": "Lorem ipsum dolor sit amet"
    })
    const { addToast } = useToasts()

    const api = ApiService(accessToken)

    const getStreamInfo = async () => {
        try {
            console.log({ lectureId })
            const response = await api
                .getStreamById(lectureId)
            setStreamInfo(response.data)
            console.log("sukces")
            addToast("Sukces", { appearance: 'success' })
        } catch (error) {
            addToast("Błąd połączenia z serwerem", { appearance: 'error' })
        }
    }

    useEffect(() => {
        getStreamInfo()
    }, [])




    return (
        <div className="container-md py-5">
            <div className="row py-5">
                <div className="col-sm-12 col-md-9">

                    <div className="row">
                        <div className="col-sm-12 pb-4">
                            <StreamWindow role={userRole} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            {
                                streamInfo && <StreamInfo {...streamInfo} />
                            }
                        </div>
                    </div>

                </div>
                <div className="col-sm-12 col-md-3">
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Lecture)