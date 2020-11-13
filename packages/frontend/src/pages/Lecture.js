import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router'


import { useUserInfo } from 'hooks'
import { useAuthContext } from 'services/auth'
import { getStreamRole } from 'services/streams'
import { StreamWindow, Chat, LiveBadge } from 'components'

const Lecture = ({ history, location }) => {
    const { user } = useUserInfo()
    const [streamInfo, setStreamInfo] = useState({
        "title": "Stream o niczym",
        "id": "2",
        "url": "/asdf",
        "lecturer": "dr Edyta Lukasik",
        "isLive": true,
        "description": "Lorem ipsum dolor sit amet"
    })

    console.log({ user })


    return (
        <div className="container">
            <div className="row mt-5 mb-2 justify-content-between">
                <div className="col-sm-12 col-md-8">
                    <StreamWindow role={'publisher'} />
                </div>
                <div className="col-sm-12 col-md-4">
                    <Chat />
                </div>
            </div>
            {
                streamInfo && (
                    <Fragment>
                        <div className="row">
                            <div className="col">
                                {streamInfo.isLive && <LiveBadge />}
                                <h1>{streamInfo.title}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2 class="h5">{streamInfo.lecturer}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>
                                    {streamInfo.description}
                                </p>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}

export default withRouter(Lecture)