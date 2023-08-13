import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsObjectId } from '../../../decorators/is-object-id.decorator';
import { RecordExists } from '../../../decorators/record-exists.decorator';
export class CreateRoomDto {
  @RecordExists({ model: 'user', propertyName: 'id' })
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  access_link: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsOptional()
  @IsDate()
  start_at: Date;
}
