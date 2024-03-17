import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload, ITokens } from '../interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateJwt(payload: IJwtPayload): ITokens {
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
    })

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
    })

    const access_expire = this.jwtService.decode(access_token, { json: true }).exp * 1000
    const refresh_expire = this.jwtService.decode(refresh_token, { json: true }).exp * 1000

    return {
      access_token,
      refresh_token,
      access_expire,
      refresh_expire,
    }
  }

  validateRefreshToken(token: string): IJwtPayload {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }
}
