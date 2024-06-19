import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSchema {
  @IsString()
  @MaxLength(40)
  @ApiProperty({
    example: 'Username',
    description: 'The name of the User.',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'username@email.com',
    description: 'The e-mail of the User.',
    required: true,
  })
  email: string;

  @IsAlphanumeric()
  @MinLength(8)
  @ApiProperty({
    description: 'The password of the User.',
    required: true,
  })
  password: string;
}
