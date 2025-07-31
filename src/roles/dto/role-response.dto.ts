import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
  @ApiProperty({
    description: 'Permission ID',
    example: '64f8a1b2c3d4e5f6a7b8c9d0',
  })
  _id: string;

  @ApiProperty({
    description: 'Permission name',
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
}

export class RoleResponseDto {
  @ApiProperty({
    description: 'Role ID',
    example: '64f8a1b2c3d4e5f6a7b8c9d0',
  })
  _id: string;

  @ApiProperty({
    description: 'Unique role name',
    example: 'content_manager',
  })
  name: string;

  @ApiProperty({
    description: 'Display name for the role',
    example: 'Content Manager',
  })
  displayName: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Manages content and user permissions',
  })
  description: string;

  @ApiProperty({
    description: 'Whether this role has super admin privileges',
    example: false,
  })
  isSuperAdmin: boolean;

  @ApiProperty({
    description: 'Whether the role is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Array of permissions assigned to this role',
    type: [PermissionResponseDto],
  })
  permissions: PermissionResponseDto[];

  @ApiProperty({
    description: 'Date when the role was created',
    example: '2023-09-06T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the role was last updated',
    example: '2023-09-06T10:30:00.000Z',
  })
  updatedAt: Date;
}

export class CreateRoleResponseDto extends RoleResponseDto {}

export class UpdateRoleResponseDto extends RoleResponseDto {}

export class RolesListResponseDto {
  @ApiProperty({
    description: 'Array of roles',
    type: [RoleResponseDto],
  })
  roles: RoleResponseDto[];

  @ApiProperty({
    description: 'Total number of roles',
    example: 10,
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