import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons"

const LiveBadge = () => {
    return (<span className="badge badge-danger h5"><FontAwesomeIcon icon={faCircle} /> Na żywo</span>)
}

export { LiveBadge }