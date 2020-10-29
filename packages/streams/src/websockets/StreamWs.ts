import { RedisService } from "../services/Redis"
import { Websocket, On, Inject, Socket } from "rakkit"

import logger from "winston"

@Websocket()
export class StreamWs {
    @Inject()
    private _exampleService: any

    @On("connection")
    connection(socket: Socket) {
        this._exampleService.Connections.push(socket)
        logger.info(`Socket ${socket.id} connected`)
    }

    @On("hello")
    yo(socket: Socket) {
        socket.emit("world")
    }

    @On("disconnect")
    disconnect(socket: Socket) {
        logger.info(`Socket ${socket.id} disconnected`)
    }
}
