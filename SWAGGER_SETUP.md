# Swagger API Documentation Setup

## Overview

This project includes comprehensive Swagger/OpenAPI documentation for all endpoints, organized by modules with proper authentication, validation, and response schemas.

## Features

### 🔧 **Swagger Configuration**
- **Interactive API Documentation**: Available at `/api-docs`
- **Module-based Organization**: APIs grouped by functionality
- **JWT Authentication**: Bearer token support
- **Request/Response Validation**: Full schema documentation
- **Error Response Documentation**: Comprehensive error handling

### 📋 **API Organization**

#### **Authentication Module** (`/api/auth`)
- **User Login**: `POST /api/auth/login`
- **Send OTP**: `POST /api/auth/send-otp`
- **Reset Password**: `POST /api/auth/reset-password`

#### **Users Module** (`/api/users`)
- **Create User**: `POST /api/users`
- **Get All Users**: `GET /api/users`
- **Get User by ID**: `GET /api/users/:id`
- **Update User**: `PATCH /api/users/:id`
- **Delete User**: `DELETE /api/users/:id`

## Installation

### Dependencies Added
```json
{
  "@nestjs/swagger": "^7.3.0",
  "swagger-ui-express": "^5.0.0",
  "class-validator": "^0.14.1",
  "class-transformer": "^0.5.1"
}
```

### Setup Steps
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Application**:
   ```bash
   npm run start:dev
   ```

3. **Access Swagger Documentation**:
   ```
   http://localhost:3000/api-docs
   ```

## API Documentation Features

### 🔐 **Authentication**
- **Bearer Token**: JWT-based authentication
- **Login Endpoint**: Get access token
- **Protected Routes**: Marked with 🔒 icon

### 📝 **Request Validation**
- **Email Validation**: Proper email format
- **Password Requirements**: Minimum 6 characters
- **Role Enumeration**: user, admin, manager
- **Required Fields**: Clear indication of required vs optional

### 📊 **Response Schemas**
- **Success Responses**: Detailed response models
- **Error Responses**: HTTP status codes and messages
- **Data Types**: Proper TypeScript types
- **Examples**: Sample request/response data

### 🏷️ **API Tags**
- **Authentication**: Login, OTP, password reset
- **Users**: CRUD operations for user management
- **Attendance**: Future attendance tracking endpoints

## Swagger UI Features

### 🔍 **Interactive Testing**
- **Try it out**: Test endpoints directly from UI
- **Request Builder**: Auto-generated request forms
- **Response Viewer**: Formatted JSON responses
- **Authentication**: JWT token input field

### 📚 **Documentation**
- **Endpoint Descriptions**: Clear operation summaries
- **Parameter Documentation**: Path, query, body parameters
- **Response Examples**: Sample success/error responses
- **Schema Definitions**: Detailed data models

## Code Structure

### **DTOs with Swagger Decorators**
```typescript
@ApiProperty({
  description: 'Email address of the user',
  example: 'john.doe@example.com',
})
@IsEmail()
readonly email: string;
```

### **Controller Decorators**
```typescript
@ApiTags('Users')
@ApiOperation({ summary: 'Create a new user' })
@ApiResponse({
  status: 201,
  description: 'User created successfully',
  type: CreateUserResponseDto,
})
```

### **Authentication Decorators**
```typescript
@ApiBearerAuth('JWT-auth')
```

## Environment Variables

Make sure your `.env` file includes:
```env
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

## Testing with Swagger UI

### 1. **Authentication Flow**
1. Use `/api/auth/login` to get JWT token
2. Click "Authorize" button in Swagger UI
3. Enter token: `Bearer <your-jwt-token>`
4. Test protected endpoints

### 2. **User Management**
1. Create user with `/api/auth/login`
2. Use returned token for protected routes
3. Test CRUD operations on users

### 3. **Password Reset Flow**
1. Send OTP with `/api/auth/send-otp`
2. Check console for OTP (development only)
3. Reset password with `/api/auth/reset-password`

## Customization

### **Adding New Endpoints**
1. Create DTOs with `@ApiProperty` decorators
2. Add `@ApiTags`, `@ApiOperation`, `@ApiResponse` to controllers
3. Update Swagger configuration if needed

### **Modifying Response Schemas**
1. Update response DTOs
2. Add new `@ApiResponse` decorators
3. Include proper error responses

### **Adding Authentication**
1. Use `@ApiBearerAuth('JWT-auth')` decorator
2. Include authentication in Swagger config
3. Document token requirements

## Best Practices

### ✅ **Do's**
- Use descriptive API summaries
- Include examples for all properties
- Document all possible response codes
- Use proper HTTP status codes
- Validate request data with DTOs

### ❌ **Don'ts**
- Don't expose sensitive data in examples
- Don't skip error response documentation
- Don't use generic response types
- Don't forget to include authentication requirements

## Troubleshooting

### **Common Issues**
1. **Swagger not loading**: Check if dependencies are installed
2. **Validation errors**: Ensure DTOs have proper decorators
3. **Authentication issues**: Verify JWT configuration
4. **Type errors**: Check TypeScript compilation

### **Debug Steps**
1. Check console for compilation errors
2. Verify all imports are correct
3. Ensure validation pipes are configured
4. Test endpoints individually

## Future Enhancements

### **Planned Features**
- **Rate Limiting**: API usage limits
- **API Versioning**: Version control for APIs
- **Advanced Filtering**: Query parameter documentation
- **File Upload**: Multipart form documentation
- **WebSocket**: Real-time API documentation

### **Integration Possibilities**
- **Postman Collection**: Auto-generate Postman collections
- **API Testing**: Automated API testing
- **Monitoring**: API usage analytics
- **Documentation Export**: PDF/HTML export options 