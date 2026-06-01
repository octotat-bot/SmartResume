import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI is not defined in environment variables');
            throw new Error('MONGODB_URI is not defined');
        }

        console.log('Connecting to MongoDB...');
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
            return mongoose;
        }).catch((error) => {
            console.error(`❌ MongoDB Connection Error: ${error.message}`);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

export default connectDB;
