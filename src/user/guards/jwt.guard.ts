import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private jwtFromRequest: JwtFromRequestFunction;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtFromRequest = ExtractJwt.fromHeader('authorization');
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtToken(request);

    if (!token) {
      throw new UnauthorizedException('Token não informado.');
    }

    try {
      const decoded = this.decodeToken(token);

      request.user = { username: decoded.username, id: decoded.sub };
    } catch (e) {
      throw new UnauthorizedException('Token inválido.');
    }

    return true;
  }

  private decodeToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('application.jwt.secret'),
    });
  }

  /**
   * Formato do JWT token: Token jwt.token.here
   */
  private extractJwtToken(request) {
    const token = this.jwtFromRequest(request);

    return (token && token.split(' ')[1]) || null;
  }
}
