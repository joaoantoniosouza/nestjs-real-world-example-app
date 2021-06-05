import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  Put,
} from '@nestjs/common';
import { User } from './decoratos/user.decorator';
import {
  UserCreateDTO,
  UserReadDTO,
  UserLoginReadDTO,
  UserUpdateDTO,
} from './dto';
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

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findAll(@Request() req) {
    const user = await this.userService.findById(req.user.id);

    return new UserReadDTO(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Put('user')
  async update(@User('id') userId: number, @Body('user') user: UserUpdateDTO) {
    const userUpdated = await this.userService.update(userId, user);

    return new UserReadDTO(userUpdated);
  }
}
