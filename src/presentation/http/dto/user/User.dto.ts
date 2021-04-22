import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'firstName is required' })
  @IsString({ message: 'firstName is type string required' })
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
