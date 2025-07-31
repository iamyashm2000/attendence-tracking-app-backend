export const databaseConfig = {
    uri: process.env.MONGODB_URI || 'mongodb+srv://darshandumaraliya:rJXF3jmWDMBUeThH@attendence-tracking-app.d2dn19p.mongodb.net/?retryWrites=true&w=majority&appName=attendence-tracking-app-clus-1',
    options: {
        dbName: process.env.DB_NAME || 'attendance_tracking',
    },
}; 