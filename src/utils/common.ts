import { BadRequestException } from "@nestjs/common";
import { ObjectId } from "mongodb"

export function validObjectId(value: string){
    if(!ObjectId.isValid(value)){
        throw new BadRequestException("O valor do id inserido é inválido!")
    }
}