import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Rooms } from '../interfaces/rooms.interface';
import { createRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomsService{

    logger: Logger

    constructor(@Inject('ROOMS_MODEL') private roomsModel: Model<Rooms>) {
        this.logger = new Logger()
    }

    async create_room(createRoomDto: createRoomDto): Promise<Rooms> {
        try {
            const createdRoom = new this.roomsModel(createRoomDto);
            return createdRoom.save();
        } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(`Um erro ocorreu ao tentar registrar: ${error.message}`)
        }
    }
}