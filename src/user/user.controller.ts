import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { UserCreateDTO, UserReadDTO, UserLoginReadDTO } from './dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Request() req) {
    const authenticatedUser = await this.userService.login(req.user);

    return new UserLoginReadDTO(authenticatedUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('users')
  async create(@Body('user') userData: UserCreateDTO) {
    const user = await this.userService.create(userData);

    return new UserReadDTO(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findAll() {
    const users = await this.userService.findAll();

    return users.map((user) => new UserReadDTO(user));
  }
}
