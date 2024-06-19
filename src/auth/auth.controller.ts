import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthSchema } from './auth.scheme';

@Controller('/auth')
@ApiTags('Auth')
@ApiHeader({ name: 'tenant', required: true })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: AuthSchema) {
    return this.authService.signIn(body.email, body.password);
  }
}
