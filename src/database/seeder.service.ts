import { Injectable, OnModuleInit } from '@nestjs/common';
import { PermissionsService } from '../permissions/permissions.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService,
  ) {}

  async onModuleInit() {
    console.log('🌱 Starting database seeding...');
    
    try {
      // Seed permissions first
      await this.permissionsService.seedDefaultPermissions();
      console.log('✅ Default permissions seeded successfully');
      
      // Seed roles
      await this.rolesService.seedDefaultRoles();
      console.log('✅ Default roles seeded successfully');
      
      console.log('🎉 Database seeding completed successfully');
    } catch (error) {
      console.error('❌ Error during database seeding:', error);
    }
  }
} 