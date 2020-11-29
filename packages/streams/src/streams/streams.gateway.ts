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

@WebSocketGateway({ transports: ["websocket"] })
export class StreamsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private usersService: UsersService) {}

    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger("MessageGateway")

    // call => createLecture-> joinLecture ( call ) if lecture exists

    @SubscribeMessage("call")
    async createStream(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any
    ) {
        const { id } = client
        const { to } = data
        const receiver = this.usersService.get(to)
        if (receiver) {
            receiver.emit("call", { ...data, from: id })
        } else {
            receiver.emit("failed")
        }
    }

    @SubscribeMessage("end")
    async endStream(@MessageBody() data: any) {
        const { to } = data
        const receiver = this.usersService.get(to)
        if (receiver) {
            receiver.emit("end")
        }
    }

    public afterInit(server: Server): void {
        this.logger.log("Initialized Websocket gateway")
    }

    public handleDisconnect(@ConnectedSocket() client: Socket): void {
        const { id } = client
        this.usersService.remove(id)
        this.logger.log(`Client ${id} connected`)
    }

    public handleConnection(@ConnectedSocket() client: Socket): void {
        const id = this.usersService.create(client)
        this.logger.log(`Client connected: ${id}`)
        client.emit("init", { id })
    }
}
