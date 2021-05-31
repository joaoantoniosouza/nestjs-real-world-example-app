import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO, UserLoginDTO } from './dto';
import { UserEntity } from './user.entity';
import { HashTool } from '@security/hash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(userData: UserCreateDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create(userData);

    return this.userRepository.save(newUser);
  }

  async authenticate({ email, password }: UserLoginDTO): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Email não cadastrado', HttpStatus.NOT_FOUND);
    }

    if (await this.passwordIsCorrect(user.password, password)) {
      return user;
    }

    throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
  }

  private async passwordIsCorrect(
    userPassword: string,
    credentialPassword: string,
  ) {
    return HashTool.isMatch(credentialPassword, userPassword);
  }
}
