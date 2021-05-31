import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserCreateDTO, UserLoginDTO, UserReadDTO } from './dto';
import { UserLoginReadDTO } from './dto/user-login-read.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('users')
  async create(@Body('user') userData: UserCreateDTO) {
    const user = await this.userService.create(userData);

    return new UserReadDTO(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('users/login')
  async login(@Body('user') credentialData: UserLoginDTO) {
    const logedUser = await this.userService.authenticate(credentialData);

    return new UserLoginReadDTO(logedUser);
  }
}
