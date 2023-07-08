import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from './dto/user-create.dto';
import { User } from './interface/create-user.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(@Inject('USER_MODEL') private userModel: Model<User>) { }

    async postCreateuser(createUserDto: CreateUserDto): Promise<User> {
        const { password } = createUserDto;
        
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const createdUser = new this.userModel({
            ...createUserDto,
            password: hash
        });
        return createdUser.save();
    }


    async postLoginuser(userLoginDto: UserLoginDto): Promise<String>{
        const { email, password } = userLoginDto;
        const user = await this.userModel.findOne({ email }).exec();

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
      
            if (passwordMatch) {
                return 'access token';
            }   
        }

        return null
    }
}
