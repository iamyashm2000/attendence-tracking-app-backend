import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
  @ApiProperty({
    description: 'Permission ID',
    example: '64f8a1b2c3d4e5f6a7b8c9d0',
  })
  _id: string;

  @ApiProperty({
    description: 'Unique permission name',
    example: 'users:create',
  })
  name: string;

  @ApiProperty({
    description: 'Module name',
    example: 'users',
  })
  module: string;

  @ApiProperty({
    description: 'Action name',
    example: 'create',
  })
  action: string;

  @ApiProperty({
    description: 'Permission description',
    example: 'Create new users',
  })
  description: string;

  @ApiProperty({
    description: 'Whether the permission is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Date when the permission was created',
    example: '2023-09-06T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the permission was last updated',
    example: '2023-09-06T10:30:00.000Z',
  })
  updatedAt: Date;
}

export class CreatePermissionResponseDto extends PermissionResponseDto {}

export class UpdatePermissionResponseDto extends PermissionResponseDto {}

export class PermissionsListResponseDto {
  @ApiProperty({
    description: 'Array of permissions',
    type: [PermissionResponseDto],
  })
  permissions: PermissionResponseDto[];

  @ApiProperty({
    description: 'Total number of permissions',
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;
} 