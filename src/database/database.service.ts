import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    console.log('Connecting to MongoDB...');
    
    this.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });

    this.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    this.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
  }

  async onModuleDestroy() {
    await this.connection.close();
    console.log('🔌 MongoDB connection closed');
  }

  getConnection(): Connection {
    return this.connection;
  }

  isConnected(): boolean {
    return this.connection.readyState === 1;
  }
} 