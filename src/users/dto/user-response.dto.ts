import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '64f8a1b2c3d4e5f6a7b8c9d0',
  })
  _id: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'user',
    enum: ['user', 'admin', 'manager'],
  })
  role: string;

  @ApiProperty({
    description: 'Whether the user account is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2023-09-06T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2023-09-06T10:30:00.000Z',
  })
  updatedAt: Date;
}

export class CreateUserResponseDto extends UserResponseDto {}

export class UpdateUserResponseDto extends UserResponseDto {}

export class UsersListResponseDto {
  @ApiProperty({
    description: 'Array of users',
    type: [UserResponseDto],
  })
  users: UserResponseDto[];

  @ApiProperty({
    description: 'Total number of users',
    example: 10,
  })
  total: number;
} 