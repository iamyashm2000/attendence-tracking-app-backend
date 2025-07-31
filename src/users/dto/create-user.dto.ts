import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  readonly name: string;

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

  @ApiPropertyOptional({
    description: 'Role of the user',
    example: 'user',
    enum: ['user', 'admin', 'manager'],
    default: 'user',
  })
  @IsOptional()
  @IsEnum(['user', 'admin', 'manager'])
  readonly role?: string;
} 