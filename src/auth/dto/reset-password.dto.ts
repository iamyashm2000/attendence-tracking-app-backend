import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Length } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'One-time password (OTP) received via email',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @Length(6, 6)
  readonly otp: string;

  @ApiProperty({
    description: 'New password for the user account',
    example: 'newpassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  readonly newPassword: string;
} 