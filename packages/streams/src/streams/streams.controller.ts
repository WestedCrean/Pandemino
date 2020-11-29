import { Controller, Get, Param, Res, Headers, Logger } from "@nestjs/common"
import { StreamsService } from "../streams/streams.service"
import { Response } from "express"

@Controller("lectures")
export class StreamsController {
    constructor(private streamsService: StreamsService) {}

    @Get("/:lectureId")
    async getStream(
        @Param("lectureId") lectureId: string,
        @Res() res: Response,
        @Headers("range") range: string
    ): Promise<any> {
        const {
            videoStream,
            headers,
        } = await this.streamsService.getVideoStream(lectureId, range)

        res.writeHead(206, headers)
        videoStream.pipe(res)
    }
}
