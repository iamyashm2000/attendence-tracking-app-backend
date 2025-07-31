# Role-Based Access Control (RBAC) System Documentation

## Overview

This project implements a comprehensive Role-Based Access Control (RBAC) system that provides dynamic, module-wise permissions for different user roles. The system allows Super Administrators to create roles and assign specific permissions to each role.

## 🏗️ **System Architecture**

### **Core Components:**

1. **Permissions**: Granular access control for each module action
2. **Roles**: Collections of permissions assigned to users
3. **Users**: End users with assigned roles
4. **Permission Guard**: Middleware that enforces access control
5. **Decorators**: Easy-to-use permission markers for endpoints

### **Permission Structure:**
```
module:action
Examples:
- users:create
- users:read
- users:update
- users:delete
- users:list
- roles:create
- permissions:list
```

## 🔐 **Default Roles & Permissions**

### **Super Administrator**
- **Role Name**: `super_admin`
- **Permissions**: All permissions (automatic)
- **Capabilities**:
  - Create, read, update, delete any user
  - Manage roles and permissions
  - Access all modules
  - Create new roles
  - Assign permissions to roles

### **Administrator**
- **Role Name**: `admin`
- **Permissions**: Most user management permissions
- **Capabilities**:
  - Manage users
  - View reports
  - Limited role management

### **Manager**
- **Role Name**: `manager`
- **Permissions**: User management and reporting
- **Capabilities**:
  - View and update users
  - Access reports
  - Cannot manage roles

### **User**
- **Role Name**: `user`
- **Permissions**: Basic access
- **Capabilities**:
  - View own profile
  - Limited module access

## 📋 **Available Modules & Permissions**

### **Users Module**
- `users:create` - Create new users
- `users:read` - View user details
- `users:update` - Update user information
- `users:delete` - Delete users
- `users:list` - List all users

### **Roles Module**
- `roles:create` - Create new roles
- `roles:read` - View role details
- `roles:update` - Update role information
- `roles:delete` - Delete roles
- `roles:list` - List all roles

### **Permissions Module**
- `permissions:create` - Create new permissions
- `permissions:read` - View permission details
- `permissions:update` - Update permission information
- `permissions:delete` - Delete permissions
- `permissions:list` - List all permissions

### **Attendance Module** (Future)
- `attendance:create` - Create attendance records
- `attendance:read` - View attendance details
- `attendance:update` - Update attendance records
- `attendance:delete` - Delete attendance records
- `attendance:list` - List all attendance records

## 🚀 **API Endpoints**

### **Authentication**
```
POST /api/auth/login - User login
POST /api/auth/send-otp - Send password reset OTP
POST /api/auth/reset-password - Reset password
```

### **Users Management**
```
POST /api/users - Create user (requires: users:create)
GET /api/users - List all users (requires: users:list)
GET /api/users/:id - Get user by ID (requires: users:read)
PATCH /api/users/:id - Update user (requires: users:update)
DELETE /api/users/:id - Delete user (requires: users:delete)
```

### **Roles Management**
```
POST /api/roles - Create role (requires: roles:create)
GET /api/roles - List all roles (requires: roles:list)
GET /api/roles/:id - Get role by ID (requires: roles:read)
PATCH /api/roles/:id - Update role (requires: roles:update)
DELETE /api/roles/:id - Delete role (requires: roles:delete)
POST /api/roles/:id/permissions - Assign permissions (requires: roles:update)
```

### **Permissions Management**
```
POST /api/permissions - Create permission (requires: permissions:create)
GET /api/permissions - List all permissions (requires: permissions:list)
GET /api/permissions/module/:module - Get by module (requires: permissions:list)
GET /api/permissions/:id - Get permission by ID (requires: permissions:read)
PATCH /api/permissions/:id - Update permission (requires: permissions:update)
DELETE /api/permissions/:id - Delete permission (requires: permissions:delete)
```

## 🔧 **Implementation Guide**

### **1. Protecting Endpoints**

Use the `@RequirePermissions` decorator to protect endpoints:

```typescript
@Post()
@RequirePermissions('users:create')
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### **2. Multiple Permissions**

Require multiple permissions for an endpoint:

```typescript
@Get()
@RequirePermissions('users:list', 'users:read')
findAll() {
  return this.usersService.findAll();
}
```

### **3. Creating Custom Roles**

```typescript
// Create a new role
const newRole = await rolesService.create({
  name: 'content_manager',
  displayName: 'Content Manager',
  description: 'Manages content and users',
  permissions: ['users:read', 'users:update', 'content:create'],
});
```

### **4. Assigning Permissions to Roles**

```typescript
// Assign permissions to a role
await rolesService.assignPermissions(roleId, [
  'permission_id_1',
  'permission_id_2',
  'permission_id_3'
]);
```

## 🛡️ **Security Features**

### **Permission Guard**
- **JWT Token Validation**: Verifies user authentication
- **Role-based Access**: Checks user's role permissions
- **Module-level Security**: Granular permission control
- **Automatic Denial**: Blocks unauthorized access

### **Super Admin Override**
- Super administrators automatically have all permissions
- Cannot be restricted by permission checks
- Can manage all aspects of the system

### **Token-based Authentication**
- JWT tokens for secure authentication
- Token expiration handling
- Automatic user context injection

## 📊 **Database Schema**

### **User Model**
```typescript
{
  name: string;
  email: string;
  password: string;
  role: ObjectId; // Reference to Role
  isActive: boolean;
}
```

### **Role Model**
```typescript
{
  name: string;
  displayName: string;
  isSuperAdmin: boolean;
  permissions: ObjectId[]; // Array of Permission references
  isActive: boolean;
  description?: string;
}
```

### **Permission Model**
```typescript
{
  name: string;
  module: string;
  action: string;
  isActive: boolean;
  description?: string;
}
```

## 🔄 **Workflow Examples**

### **Creating a New Role with Permissions**

1. **Create Permissions** (if needed):
   ```bash
   POST /api/permissions
   {
     "name": "custom:action",
     "module": "custom",
     "action": "action",
     "description": "Custom permission"
   }
   ```

2. **Create Role**:
   ```bash
   POST /api/roles
   {
     "name": "custom_role",
     "displayName": "Custom Role",
     "description": "Custom role with specific permissions"
   }
   ```

3. **Assign Permissions**:
   ```bash
   POST /api/roles/{roleId}/permissions
   {
     "permissionIds": ["permission_id_1", "permission_id_2"]
   }
   ```

4. **Assign Role to User**:
   ```bash
   PATCH /api/users/{userId}
   {
     "role": "role_id"
   }
   ```

### **Super Admin Operations**

1. **Create New Module Permissions**:
   ```bash
   POST /api/permissions
   {
     "name": "reports:generate",
     "module": "reports",
     "action": "generate",
     "description": "Generate reports"
   }
   ```

2. **Create Role for Reports**:
   ```bash
   POST /api/roles
   {
     "name": "report_manager",
     "displayName": "Report Manager",
     "description": "Manages reports and analytics"
   }
   ```

3. **Assign Report Permissions**:
   ```bash
   POST /api/roles/{roleId}/permissions
   {
     "permissionIds": ["reports:generate", "reports:read", "reports:list"]
   }
   ```

## 🧪 **Testing the System**

### **1. Login as Super Admin**
```bash
POST /api/auth/login
{
  "email": "superadmin@example.com",
  "password": "password123"
}
```

### **2. Create a New Role**
```bash
POST /api/roles
Authorization: Bearer <super_admin_token>
{
  "name": "test_role",
  "displayName": "Test Role",
  "description": "Test role for demonstration"
}
```

### **3. Assign Permissions**
```bash
POST /api/roles/{roleId}/permissions
Authorization: Bearer <super_admin_token>
{
  "permissionIds": ["permission_id_1", "permission_id_2"]
}
```

### **4. Test Permission Guard**
```bash
GET /api/users
Authorization: Bearer <user_token_with_limited_permissions>
# Should return 403 if user doesn't have users:list permission
```

## 🔍 **Troubleshooting**

### **Common Issues**

1. **403 Forbidden Error**:
   - Check if user has the required permissions
   - Verify role is properly assigned
   - Ensure permissions are correctly configured

2. **Permission Not Found**:
   - Verify permission exists in database
   - Check permission name format (module:action)
   - Ensure permission is active

3. **Role Assignment Issues**:
   - Verify role exists and is active
   - Check if user role field is properly set
   - Ensure role has the required permissions

### **Debug Steps**

1. **Check User Role**:
   ```bash
   GET /api/users/{userId}
   ```

2. **Check Role Permissions**:
   ```bash
   GET /api/roles/{roleId}
   ```

3. **List All Permissions**:
   ```bash
   GET /api/permissions
   ```

## 🚀 **Future Enhancements**

### **Planned Features**
- **Permission Groups**: Group related permissions
- **Dynamic Permissions**: Runtime permission creation
- **Audit Logging**: Track permission usage
- **Permission Inheritance**: Hierarchical permissions
- **Time-based Permissions**: Temporary access grants

### **Integration Possibilities**
- **LDAP Integration**: External user management
- **SSO Support**: Single sign-on integration
- **API Rate Limiting**: Based on permissions
- **Real-time Updates**: WebSocket permission changes

## 📚 **Best Practices**

### **Security**
- Always use HTTPS in production
- Regularly rotate JWT secrets
- Implement proper password policies
- Log all permission changes
- Regular security audits

### **Performance**
- Cache permission checks
- Use database indexes on permission fields
- Implement permission preloading
- Optimize role queries

### **Maintenance**
- Regular permission audits
- Clean up unused permissions
- Monitor permission usage
- Document custom permissions 