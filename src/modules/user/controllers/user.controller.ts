import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserCreatedDto } from '../dto/user-created.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_created')
  async registerUser(@Payload() userCreatedPayload: UserCreatedDto) {
    await this.userService.create(userCreatedPayload)
    return
  }
}
