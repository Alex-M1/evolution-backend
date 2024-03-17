import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';
import { MAX_LENGTH } from '../constants/entity.constants';
import { ERRORS_MESSAGE } from '../../utils/constants/errors-message';

export class SignUpDto {
  @ApiProperty({
    required: true,
    example: 'UserName',
    description: 'User name',
  })
  @IsString()
  @Length(MAX_LENGTH.login.min, MAX_LENGTH.login.max)
  @Matches(/^[A-Za-z]+$/, {
    message: ERRORS_MESSAGE.user.password_validation,
  })
    login: string;

  @ApiProperty({
    required: true,
    example: 'password',
    description: 'User password',
  })
  @IsString()
  @Length(MAX_LENGTH.password.min, MAX_LENGTH.password.max)
  @Matches(/^[A-Za-z\d!@#$%^&*()]+$/, {
    message: ERRORS_MESSAGE.user.password_validation,
  })

    password: string;
}
