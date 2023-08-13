import { Injectable } from '@nestjs/common';
import { createRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomsService{
    constructor() {
    }

    async create_room(createRoomDto: createRoomDto){

    }
}