import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, IsEnum, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'Password for the user account',
    example: 'newpassword123',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password?: string;

  @ApiPropertyOptional({
    description: 'Role of the user',
    example: 'admin',
    enum: ['user', 'admin', 'manager'],
  })
  @IsOptional()
  @IsEnum(['user', 'admin', 'manager'])
  readonly role?: string;

  @ApiPropertyOptional({
    description: 'Whether the user account is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
} 