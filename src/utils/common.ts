import { BadRequestException } from "@nestjs/common";
import { isObjectIdOrHexString } from "mongoose";

export function validObjectId(value: string){
    if(!isObjectIdOrHexString(value)){
        throw new BadRequestException("O valor do id inserido é inválido!")
    }
}