import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from '../config/database.config';
import { DatabaseService } from './database.service';

@Module({
    imports: [
        MongooseModule.forRoot(databaseConfig.uri, databaseConfig.options),
    ],
    providers: [DatabaseService],
    exports: [MongooseModule, DatabaseService],
})
export class DatabaseModule { } 