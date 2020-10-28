import React, {
    Fragment,
    useEffect,
    useState,
} from "react"

import { useAuthContext } from 'services/auth'
import ApiService from 'services/api'

const ListStreams = () => {
    const [streams, setStreams] = useState([])
    
    const { accessToken } = useAuthContext()

    const getStreams = async () => {
        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getAvailableStreams()
            setStreams(response.data)
        } catch (error) {
            console.error({error})
        }
    }
    useEffect(() => {
        getStreams()
    }, [])

    return (
        <Fragment>
            <div className="list-container">
                <div className="list-streams">
                    {streams.map((stream,i) => (
                        <div className="list-element" key={`${stream.name}-${stream.views}-${i}`}>
                            <div className="list-element-inside">
                                <div className="list-element-badge" />
                                <div className="list-element-leader">
                                    {stream.name}
                                </div>
                                <div className="list-element-description">
                                    {stream.description}
                                </div>
                                <div className="list-element-data">
                                    {stream.views}
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
