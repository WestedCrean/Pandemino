import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

const ListStreams = () => {
    const [streams, setStreams] = useState([])
    /**
     * single stream schema
     * {
     *  id: number
     *  name: string
     *  description: string
     *  views: number
     *  isPublished: boolean
     *  isLive: boolean
     * }
     */

    const getStreams = async () => {
        try {
            const response = await fetch("http://localhost:5000/streams").json()
            setStreams(response)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getStreams()
    }, [])

    return (
        <Fragment>
            <div className="list-container">
                <div className="list-streams">
                    {streams.map((stream) => (
                        <div className="list-element">
                            <div className="list-element-inside">
                                <div className="list-element-badge" />
                                <div className="list-element-leader">
                                    {stream.leader_stream}
                                </div>
                                <div className="list-element-description">
                                    {stream.name_stream}
                                </div>
                                <div className="list-element-data">
                                    {stream.date_stream}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default ListStreams
