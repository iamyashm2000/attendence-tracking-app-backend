import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  readonly password: string;
} 