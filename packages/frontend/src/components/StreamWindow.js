import React from "react"
import { useUserInfo } from "hooks"
import { getStreamRole } from "services/streams"
import { StreamPublisher, StreamConsumer, Chat } from "components"

const StreamWindow = ({ streamInfo, socket, ...props }) => {
    const userInfo = useUserInfo()
    const streamRole = getStreamRole(userInfo, streamInfo)
    const StreamComponent =
        streamRole === "publisher" ? StreamPublisher : StreamConsumer

    if (socket === undefined) {
        return <div>Loading</div>
    } else {
        return (
            <StreamComponent
                streamInfo={streamInfo}
                socket={socket}
                {...props}
            />
        )
    }
}

function propsAreEqual(prevProps, nextProps) {
    return (
        prevProps.streamId === nextProps.streamId &&
        prevProps.socket.id === nextProps.socket.id &&
        prevProps.streamInfo === nextProps.streamInfo &&
        prevProps.socket === nextProps.socket
    )
}

const MemoizedStreamWindow = React.memo(StreamWindow, propsAreEqual)

export default StreamWindow
