import React, { Fragment } from "react"
import { LiveBadge } from "./Badges"

const StreamInfo = ({
    name,
    lecturer,
    description,
    isLive,
    views,
    createdAt,
}) => (
    <Fragment>
        <div className="row">
            <div className="col">
                {isLive && <LiveBadge />}
                <h1>{name}</h1>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2 className="h5">{lecturer}</h2>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p>{description}</p>
            </div>
        </div>
    </Fragment>
)

export default StreamInfo
