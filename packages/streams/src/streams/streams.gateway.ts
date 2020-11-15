import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsResponse,
} from "@nestjs/websockets"
import { Logger } from "@nestjs/common"
import { from, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Server, Socket } from "socket.io"

@WebSocketGateway({ transports: ["websocket"] })
export class StreamsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger("MessageGateway")

    @SubscribeMessage("streamChunk")
    handleEvent(client: Socket, data: string): string {
        this.logger.log(`Message: ${data}`)
        return data
    }

    @SubscribeMessage("msgToServer")
    public handleMessage(client: Socket, payload: any): void {
        client.emit("", payload)
    }

    @SubscribeMessage("joinStream")
    async joinStream(client: Socket, stream: string): Promise<string> {
        return stream
    }

    @SubscribeMessage("leaveStream")
    async leaveStream(@MessageBody() data: number): Promise<number> {
        return data
    }

    public afterInit(server: Server): void {
        return this.logger.log("Initialized Websocket gateway")
    }

    public handleDisconnect(client: Socket): void {
        return this.logger.log(`Client disconnected: ${client.id}`)
    }

    public handleConnection(client: Socket): void {
        client.emit("events", "HALO KURWA")
        return this.logger.log(`Client connected: ${client.id}`)
    }
}
