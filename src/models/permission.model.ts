import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  module: string;

  @Prop({ required: true })
  action: string; // create, read, update, delete, list

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  description?: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission); 