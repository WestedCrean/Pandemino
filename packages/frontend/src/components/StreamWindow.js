import React from 'react'
import { StreamPublisher, StreamConsumer, Chat } from 'components'

const StreamWindow = ({ role, width, height }) => {

    const [mediaDevice, setMediaDevice] = React.useState(null)



    const StreamComponent = role === 'publisher' ? StreamPublisher : StreamConsumer

    return (
        <StreamComponent />
    )
}

export default StreamWindow