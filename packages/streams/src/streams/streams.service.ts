import {
    Injectable,
    BadRequestException,
    NotFoundException,
    Logger,
} from "@nestjs/common"
import { promises as fs, createReadStream } from "fs"
import { join } from "path"

const CHUNK_SIZE = 10 ** 6 // 1MB - FIXME: implement caching on the frontend

type VideoHeaders = {
    "Content-Range": string
    "Accept-Ranges": string
    "Content-Length": number
    "Content-Type": string
}

@Injectable()
export class StreamsService {
    private async getVideoInfo(videoId): Promise<any> {
        /**
         * Get video info to tmp folder and return { videoPath, videoSize }
         */
        const videoPath = join(__dirname, "../..", "client", "witcher3.mp4")
        const stats = await fs.stat(videoPath)
        return { videoPath, videoSize: stats.size }
    }

    private getRangeHeaders(
        start: number,
        end: number,
        videoSize: number
    ): VideoHeaders {
        return {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": end - start + 1,
            "Content-Type": "video/mp4",
        }
    }

    private getRangeConstraints(
        range: string,
        videoSize: number
    ): { start: number; end: number } {
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
        return {
            start,
            end,
        }
    }

    public async getVideoStream(videoId, range) {
        if (!range) {
            throw new BadRequestException("Requires Range header")
        }
        try {
            const { videoPath, videoSize } = await this.getVideoInfo(videoId)
            const { start, end } = this.getRangeConstraints(range, videoSize)
            const headers = this.getRangeHeaders(start, end, videoSize)
            const videoStream = createReadStream(videoPath, { start, end })
            return { videoStream, headers }
        } catch (e) {
            throw new NotFoundException(e)
        }
    }
}
