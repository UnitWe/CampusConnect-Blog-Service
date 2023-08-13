import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsObjectId } from '../../../decorators/is-object-id.decorator';
import { RecordExists } from '../../../decorators/record-exists.decorator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @RecordExists({ model: 'user', propertyName: 'id' })
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  author_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  reading_time: number;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
