# MongoDB Setup Documentation

## Folder Structure

```
src/
├── config/
│   ├── app.config.ts      # Application configuration
│   ├── database.config.ts # Database configuration
│   └── index.ts          # Configuration exports
├── database/
│   ├── database.module.ts # MongoDB connection module
│   └── database.service.ts # Database service with connection events
├── models/
│   ├── user.model.ts     # User schema definition
│   └── index.ts          # Model exports
└── ...
```

## Configuration

### Database Configuration (`src/config/database.config.ts`)
- MongoDB connection URI
- Connection options
- Database name

### Application Configuration (`src/config/app.config.ts`)
- Port number
- Environment variables
- JWT settings

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=attendance_tracking

# Application Configuration
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

## Installation

Install the required dependencies:

```bash
npm install @nestjs/mongoose mongoose
```

## Usage

The MongoDB connection is automatically established when the application starts. The `DatabaseService` provides:

- Connection status monitoring
- Automatic connection/disconnection handling
- Connection event logging

## Features

1. **Automatic Connection**: MongoDB connects automatically on app startup
2. **Connection Monitoring**: Real-time connection status and event logging
3. **Graceful Shutdown**: Proper connection cleanup on app termination
4. **Environment-based Configuration**: Flexible configuration through environment variables
5. **Schema Definition**: Ready-to-use User model with timestamps

## Connection Events

- ✅ Connected: MongoDB connected successfully
- ❌ Error: MongoDB connection error
- ⚠️ Disconnected: MongoDB disconnected
- 🔌 Closed: MongoDB connection closed 