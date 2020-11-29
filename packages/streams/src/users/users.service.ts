import {
    Injectable,
    BadRequestException,
    NotFoundException,
    Logger,
} from "@nestjs/common"
import { Socket } from "socket.io"

interface Room {
    lecturer: any
    viewers: Array<any>
}

@Injectable()
export class UsersService {
    lecturers: any
    users: Object

    public create(socket: Socket): string {
        const { id } = socket
        this.users[id] = socket
        return id
    }

    public get(id: string): Socket {
        return this.users[id]
    }

    public remove(id: string): void {
        delete this.users[id]
    }
}
