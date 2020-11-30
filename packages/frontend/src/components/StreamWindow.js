import React from "react"
import { StreamPublisher, StreamConsumer, Chat } from "components"

const StreamWindow = ({ role, width, height, streamId }) => {
    const StreamComponent =
        role === "lecturer" ? StreamPublisher : StreamConsumer

    return <StreamComponent streamId={streamId} />
}

export default StreamWindow
