import React from 'react'
import { StreamPublisher, StreamConsumer, Chat } from 'components'

const StreamWindow = ({ role, width, height }) => {

    const StreamComponent = role === 'publisher' ? StreamPublisher : StreamConsumer

    return (
        <StreamComponent />
    )
}

export default StreamWindow