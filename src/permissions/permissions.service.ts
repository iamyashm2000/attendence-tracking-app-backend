import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from '../models/permission.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(createPermissionDto: any): Promise<Permission> {
    const { name, module, action, description } = createPermissionDto;

    // Check if permission already exists
    const existingPermission = await this.permissionModel.findOne({ name });
    if (existingPermission) {
      throw new ConflictException('Permission with this name already exists');
    }

    const permission = new this.permissionModel({
      name,
      module,
      action,
      description,
    });

    return permission.save();
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findByModule(module: string): Promise<Permission[]> {
    return this.permissionModel.find({ module }).exec();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: any): Promise<Permission> {
    const permission = await this.permissionModel
      .findByIdAndUpdate(id, updatePermissionDto, { new: true })
      .exec();
    
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async remove(id: string): Promise<void> {
    const result = await this.permissionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Permission not found');
    }
  }

  async seedDefaultPermissions(): Promise<void> {
    const defaultPermissions = [
      // User module permissions
      { name: 'user.create', module: 'users', action: 'create', description: 'Create users' },
      { name: 'user.read', module: 'users', action: 'read', description: 'View user details' },
      { name: 'user.update', module: 'users', action: 'update', description: 'Update users' },
      { name: 'user.delete', module: 'users', action: 'delete', description: 'Delete users' },
      { name: 'user.list', module: 'users', action: 'list', description: 'List all users' },
      
      // Role module permissions
      { name: 'role.create', module: 'roles', action: 'create', description: 'Create roles' },
      { name: 'role.read', module: 'roles', action: 'read', description: 'View role details' },
      { name: 'role.update', module: 'roles', action: 'update', description: 'Update roles' },
      { name: 'role.delete', module: 'roles', action: 'delete', description: 'Delete roles' },
      { name: 'role.list', module: 'roles', action: 'list', description: 'List all roles' },
      
      // Permission module permissions
      { name: 'permission.create', module: 'permissions', action: 'create', description: 'Create permissions' },
      { name: 'permission.read', module: 'permissions', action: 'read', description: 'View permission details' },
      { name: 'permission.update', module: 'permissions', action: 'update', description: 'Update permissions' },
      { name: 'permission.delete', module: 'permissions', action: 'delete', description: 'Delete permissions' },
      { name: 'permission.list', module: 'permissions', action: 'list', description: 'List all permissions' },
      
      // Attendance module permissions (for future use)
      { name: 'attendance.create', module: 'attendance', action: 'create', description: 'Create attendance records' },
      { name: 'attendance.read', module: 'attendance', action: 'read', description: 'View attendance details' },
      { name: 'attendance.update', module: 'attendance', action: 'update', description: 'Update attendance records' },
      { name: 'attendance.delete', module: 'attendance', action: 'delete', description: 'Delete attendance records' },
      { name: 'attendance.list', module: 'attendance', action: 'list', description: 'List all attendance records' },
    ];

    for (const permission of defaultPermissions) {
      const exists = await this.permissionModel.findOne({ name: permission.name });
      if (!exists) {
        await this.permissionModel.create(permission);
      }
    }
  }
} 