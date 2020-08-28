import { Body, Controller, Post } from '@nestjs/common';
import { loginDto } from '../users/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('auth/login')
  async login(@Body() req: loginDto): Promise<any> {
    return this.authService.login(req);
  }
}
