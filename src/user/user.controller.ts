import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HashTool } from '~/shared/security/hash';
import {
  UserCreateDTO,
  UserReadDTO,
  AuthCredentialsDTO,
  UserLoginReadDTO,
} from './dto';
import { JwtAuthGuard } from './guards/jwt.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findAll() {
    const users = await this.userService.findAll();

    return users.map((user) => new UserReadDTO(user));
  }
}
