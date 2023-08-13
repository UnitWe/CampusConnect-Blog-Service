import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/services/prisma.service';
import { UserCreatedDto } from '../dto/user-created.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService){}

    async create(userCreatedData: UserCreatedDto){
        const userData = await this.prismaService.user.create({
            data: {
                username: userCreatedData.username,
                email: userCreatedData.email,
                user_service_id: userCreatedData.id
            }
        })

        return
    }
}
