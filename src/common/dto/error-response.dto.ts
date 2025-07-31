import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Bad Request',
  })
  message: string;

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-09-06T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/users',
  })
  path: string;
}

export class ValidationErrorResponseDto extends ErrorResponseDto {
  @ApiProperty({
    description: 'Validation errors',
    example: [
      {
        field: 'email',
        message: 'email must be an email',
        value: 'invalid-email',
      },
    ],
    type: 'array',
  })
  errors: Array<{
    field: string;
    message: string;
    value: any;
  }>;
}

export class NotFoundErrorResponseDto extends ErrorResponseDto {}

export class UnauthorizedErrorResponseDto extends ErrorResponseDto {}

export class ForbiddenErrorResponseDto extends ErrorResponseDto {}

export class ConflictErrorResponseDto extends ErrorResponseDto {} 