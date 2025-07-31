import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';

export class AssignPermissionsDto {
  @ApiProperty({
    description: 'Array of permission IDs to assign to the role',
    example: ['64f8a1b2c3d4e5f6a7b8c9d0', '64f8a1b2c3d4e5f6a7b8c9d1', '64f8a1b2c3d4e5f6a7b8c9d2'],
    type: [String],
    minItems: 1,
  })
  @IsArray()
  @IsMongoId({ each: true })
  readonly permissionIds: string[];
} 