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

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: email });
  }

  async create(userData: UserCreateDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create(userData);

    return this.userRepository.save(newUser);
  }
}
