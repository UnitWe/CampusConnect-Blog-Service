import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../dto/create-room.dto';
import { PrismaService } from '../../../modules/prisma/services/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create_room(createRoomData: CreateRoomDto) {
    const roomData = await this.prismaService.room.create({
        data: createRoomData
    })
  }
}
