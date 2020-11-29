import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    WsResponse,
} from "@nestjs/websockets"
import { Logger } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { from, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Server, Socket } from "socket.io"

@WebSocketGateway()
export class StreamsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private usersService: UsersService) {}

    @WebSocketServer()
    server: Server

    broadcaster: any = null

    private logger: Logger = new Logger("MessageGateway")

    // connection for clients and lecturer (broadcaster)
    @SubscribeMessage("broadcaster")
    async broadcast(@ConnectedSocket() socket: Socket) {
        const { id } = socket
        this.broadcaster = id
        this.logger.log("Broadcaster id: ", id)
        socket.broadcast.emit("broadcaster")
    }

    @SubscribeMessage("watcher")
    async watch(@ConnectedSocket() socket: Socket) {
        const { id } = socket
        this.logger.log("Watcher id: ", id)
        if (this.broadcaster !== null) {
            this.logger.log("Watcher - broadcaster is not null, id: ", id)
            socket.to(this.broadcaster).emit("watcher", id)
        }
    }
    @SubscribeMessage("disconnect")
    async disconnect(@ConnectedSocket() socket: Socket) {
        const { id } = socket
        this.logger.log("Disconnect id: ", id)
        if (this.broadcaster !== null) {
            this.logger.log("Disconnect - broadcaster is not null, id: ", id)
            socket.to(this.broadcaster).emit("disconnectPeer", id)
        }
    }

    // WebRTC connection

    @SubscribeMessage("offer")
    async offer(@ConnectedSocket() socket: Socket, @MessageBody() data) {
        const { id } = socket
        const { id: offerId, message } = data
        this.logger.log("offer from id: ", id)
        socket.to(offerId).emit("offer", id, message)
    }

    @SubscribeMessage("answer")
    async answer(@ConnectedSocket() socket: Socket, @MessageBody() data) {
        const { id } = socket
        const { id: answerId, message } = data
        this.logger.log("answer from id: ", id)
        socket.to(answerId).emit("answer", id, message)
    }

    @SubscribeMessage("candidate")
    async candidate(@ConnectedSocket() socket: Socket, @MessageBody() data) {
        const { id } = socket
        const { id: candidateId, message } = data
        this.logger.log("candidate from id: ", id)
        socket.to(candidateId).emit("candidate", id, message)
    }

    public afterInit(server: Server): void {
        this.logger.log("Initialized Websocket gateway")
    }

    public handleDisconnect(@ConnectedSocket() socket: Socket): void {
        const { id } = socket
        //this.usersService.remove(id)
        this.logger.log(`socket ${id} connected`)
    }

    public handleConnection(@ConnectedSocket() socket: Socket): void {
        const { id } = socket
        //const id = this.usersService.create(socket)
        this.logger.log(`socket connected: ${id}`)
        //socket.emit("init", { id })
    }
}
