import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({
    description: 'Email address to send OTP to',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  readonly email: string;
} 