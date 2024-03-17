import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ROUTES } from '../utils/constants/routes';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller(ROUTES.USER.MAIN)
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post(ROUTES.USER.SIGN_UP)
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refresh_token,access_token } = await this.userService.signUp(signUpDto);

    res.cookie('refresh_token', refresh_token, { httpOnly: true });
    res.cookie('access_token', access_token, { httpOnly: true });

    return;
  }

  @Post(ROUTES.USER.SIGN_IN)
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {

    const {
      refresh_token,
      access_token,
      refresh_expire,
      access_expire,
    } = await this.userService.signIn(signInDto.login, signInDto.password);

    res.cookie('refresh_token', refresh_token, { httpOnly: true, expires: new Date(refresh_expire) });
    res.cookie('access_token', access_token, { httpOnly: true, expires: new Date(access_expire) });
    return;
  }

  @Get(ROUTES.USER.GET_USER)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async getUser() {
    return { message: 'User is authorized' };
  }
}
