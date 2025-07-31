import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray, MinLength, MaxLength, IsMongoId } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    description: 'Unique name for the role (used internally)',
    example: 'content_manager',
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Display name for the role (shown to users)',
    example: 'Content Manager',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly displayName?: string;

  @ApiPropertyOptional({
    description: 'Description of the role',
    example: 'Manages content and user permissions',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Whether this role has super admin privileges',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isSuperAdmin?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the role is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Array of permission IDs to assign to this role',
    example: ['64f8a1b2c3d4e5f6a7b8c9d0', '64f8a1b2c3d4e5f6a7b8c9d1'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly permissions?: string[];
} 