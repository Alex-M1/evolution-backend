import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { SignUpDto } from '../dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {
  }
  async signUp(signUpDto: SignUpDto) {
    const user = await this.userRepository.entity.findOneBy({ login: signUpDto.login });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.hashPassword(signUpDto.password);
    const newUser  = await this.userRepository.saveUser(signUpDto.login, hashedPassword);

    return this.tokenService.generateJwt({ login: newUser.login, id: newUser.id });
  }

  async signIn(login: string, password: string) {
    const user = await this.userRepository.entity.findOneBy({ login });
    if(!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.tokenService.generateJwt({ login: user.login, id: user.id });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
