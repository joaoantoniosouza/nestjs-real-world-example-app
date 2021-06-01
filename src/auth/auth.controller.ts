import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  login(@Body('user') user: any) {
    return this.authService.login(user);
  }
}
