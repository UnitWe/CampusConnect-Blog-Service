import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto } from './dto/user-create.dto';



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.postCreateuser(createUserDto)
    }

    @Post('/login')
    async findAll(@Body() userLoginDto: UserLoginDto) {
        const token = await this.userService.postLoginuser(userLoginDto);

        if (token) {
            // Login bem-sucedido
            return { message: 'Login successful', token };
        } else {
            // Credenciais inválidas
            return { message: 'Invalid credentials' };
        }

    }


}
