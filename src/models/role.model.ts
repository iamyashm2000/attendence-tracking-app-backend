import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ default: false })
  isSuperAdmin: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Permission' }] })
  permissions: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  description?: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role); 