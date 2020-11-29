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
export class LecturesService {
    rooms: Object
    users: Object
    public createRoom(lectureId: string, lecturerSocket: Socket) {
        this.rooms[lectureId] = {
            lecturer: lecturerSocket,
            viewers: {},
        }
        return lectureId
    }

    public createUser(lectureId: string, socket: Socket): string {
        if (this.rooms[lectureId]) {
            const { id } = socket
            this.rooms[lectureId].viewers[id] = socket
            return id
        }
        throw new Error("Lecture does not exist")
    }

    public getUserFromRoom(lectureId: string, userId: string): Socket {
        if (this.rooms[lectureId]) {
            return this.rooms[lectureId].viewers[userId]
        }
        throw new Error("Lecture does not exist")
    }

    public removeUserFromRoom(lectureId: string, userId: string): void {
        if (this.rooms[lectureId]) {
            delete this.rooms[lectureId].viewers[userId]
        }
        throw new Error("Lecture does not exist")
    }
}
