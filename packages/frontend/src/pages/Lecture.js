import React, { Fragment, useState } from 'react'
import { StreamWindow, Chat } from 'components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons"

const Lecture = ({ ...props }) => {

    const [streamInfo, setStreamInfo] = useState({
        "title": "Stream o niczym",
        "id": "1",
        "url": "/asdf",
        "lecturer": "dr Edyta Lukasik",
        "isLive": true,
        "description": "Lorem ipsum dolor sit amet"
    })

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
                                {streamInfo.isLive && <span class="badge badge-danger h5"><FontAwesomeIcon icon={faCircle} /> Na żywo</span>}
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

export default Lecture