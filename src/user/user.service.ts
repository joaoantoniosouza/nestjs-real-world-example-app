import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO, AuthCredentialsDTO } from './dto';
import { UserEntity } from './user.entity';
import { HashTool } from '@security/hash';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashTool: HashTool,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userData: UserCreateDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create(userData);

    return this.userRepository.save(newUser);
  }

  async login(user: UserEntity): Promise<AuthenticatedUser> {
    const jwtToken = await this.generateJwtToken(user.username, user.id);

    return { user: user, token: jwtToken };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);

    if (user && (await this.checkPassword(password, user.password))) {
      return user;
    }

    return null;
  }

  private async checkPassword(password, passwordHash) {
    return this.hashTool.isMatch(password, passwordHash);
  }

  private async generateJwtToken(username: string, sub: number) {
    return this.jwtService.sign({ username, sub });
  }
}
