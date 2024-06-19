import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';

export class AuthSchema {
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
