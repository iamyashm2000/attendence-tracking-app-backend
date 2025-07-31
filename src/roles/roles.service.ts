import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from '../models/role.model';
import { Permission, PermissionDocument } from '../models/permission.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(createRoleDto: any): Promise<Role> {
    const { name, displayName, permissions, description, isSuperAdmin } = createRoleDto;

    // Check if role already exists
    const existingRole = await this.roleModel.findOne({ name });
    if (existingRole) {
      throw new ConflictException('Role with this name already exists');
    }

    const role = new this.roleModel({
      name,
      displayName,
      permissions: permissions || [],
      description,
      isSuperAdmin: isSuperAdmin || false,
    });

    return role.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().populate('permissions').exec();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).populate('permissions').exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleModel.findOne({ name }).populate('permissions').exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: string, updateRoleDto: any): Promise<Role> {
    const role = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .populate('permissions')
      .exec();
    
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async remove(id: string): Promise<void> {
    const result = await this.roleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Role not found');
    }
  }

  async assignPermissions(roleId: string, permissionIds: string[]): Promise<Role> {
    const role = await this.roleModel.findById(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Verify all permissions exist
    const permissions = await this.permissionModel.find({
      _id: { $in: permissionIds }
    });
    
    if (permissions.length !== permissionIds.length) {
      throw new NotFoundException('Some permissions not found');
    }

    role.permissions = permissionIds.map(id => new Types.ObjectId(id));
    return role.save();
  }

  async hasPermission(roleId: string, module: string, action: string): Promise<boolean> {
    const role = await this.roleModel.findById(roleId).populate('permissions').exec();
    if (!role) {
      return false;
    }

    // Super admin has all permissions
    if (role.isSuperAdmin) {
      return true;
    }

    // Check if role has the specific permission
    const hasPermission = role.permissions.some((permission: any) => 
      permission.module === module && permission.action === action
    );

    return hasPermission;
  }

  async seedDefaultRoles(): Promise<void> {
    const defaultRoles = [
      {
        name: 'super_admin',
        displayName: 'Super Administrator',
        description: 'Has access to all modules and can manage roles and permissions',
        isSuperAdmin: true,
        permissions: [],
      },
      {
        name: 'admin',
        displayName: 'Administrator',
        description: 'Has access to most modules with limited role management',
        isSuperAdmin: false,
        permissions: [],
      },
      {
        name: 'manager',
        displayName: 'Manager',
        description: 'Can manage users and view reports',
        isSuperAdmin: false,
        permissions: [],
      },
      {
        name: 'user',
        displayName: 'User',
        description: 'Basic user with limited access',
        isSuperAdmin: false,
        permissions: [],
      },
    ];

    for (const roleData of defaultRoles) {
      const exists = await this.roleModel.findOne({ name: roleData.name });
      if (!exists) {
        await this.roleModel.create(roleData);
      }
    }
  }
} 