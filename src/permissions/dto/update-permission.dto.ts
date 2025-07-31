import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdatePermissionDto {
  @ApiPropertyOptional({
    description: 'Unique permission name (format: module:action)',
    example: 'users:create',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Module name for the permission',
    example: 'users',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly module?: string;

  @ApiPropertyOptional({
    description: 'Action name for the permission',
    example: 'create',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly action?: string;

  @ApiPropertyOptional({
    description: 'Description of the permission',
    example: 'Create new users',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Whether the permission is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
} 