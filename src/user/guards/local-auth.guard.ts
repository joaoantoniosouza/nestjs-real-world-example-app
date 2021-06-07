import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body.user;

    if (!email || !password) {
      throw new UnauthorizedException('Credenciais não informadas');
    }

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    request.user = user;

    return true;
  }
}
