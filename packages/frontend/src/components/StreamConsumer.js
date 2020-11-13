import React from 'react'
import { Player, ControlBar, VolumeMenuButton } from 'video-react'


const StreamConsumer = ({ videoSrc }) => {
    return (
        <div className="card border-dark stream-window">
            <div className="card-body p-0">
                <Player autoPlay src={videoSrc}>
                    <ControlBar autoHide={false} disableDefaultControls className="my-class">
                        <VolumeMenuButton />
                    </ControlBar>
                </Player>
            </div>
        </div >
    )
}

export default StreamConsumer