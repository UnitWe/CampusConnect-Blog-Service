import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service'
import { CreateRoomDto } from '../dto/create-room.dto';


@Controller('rooms')
export class RoomsController {
    constructor (private readonly roomsService: RoomsService) {}

    @Post('create')
    create_room(@Body() body: CreateRoomDto) {
        return this.roomsService.create_room(body)
    }
}