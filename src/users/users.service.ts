import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: any): Promise<User> {
    const { email, password, name, role } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      email,
      password: hashedPassword,
      name,
      role: role,
    });

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 }).populate('role').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id, { password: 0 }).populate('role').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).populate('role').exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    const { password, ...updateData } = updateUserDto;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true, select: '-password' })
      .populate('role')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
} 