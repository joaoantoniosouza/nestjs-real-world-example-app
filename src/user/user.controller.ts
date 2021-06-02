import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { HashTool } from '~/shared/security/hash';
import {
  UserCreateDTO,
  UserReadDTO,
  AuthCredentialsDTO,
  UserLoginReadDTO,
} from './dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly hash: HashTool,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('users/login')
  async login(@Body('user') authCredentials: AuthCredentialsDTO) {
    const { user, accessToken } = await this.userService.login(authCredentials);
    this.hash.generate('asdf');
    return new UserLoginReadDTO(user, accessToken);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('users')
  async create(@Body('user') userData: UserCreateDTO) {
    const user = await this.userService.create(userData);

    return new UserReadDTO(user);
  }
}
