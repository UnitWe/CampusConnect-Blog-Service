export class CreateUserDto {
    name: string
    email: string
    password: string
}

export class UserLoginDto {
    email: string
    password: string
}