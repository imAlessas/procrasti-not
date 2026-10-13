import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';

let connection: Promise<typeof mongoose> | null = null;

// Returns the shared connection. A failed attempt is not cached, so the next call retries.
export function connectToMongoDB(): Promise<typeof mongoose> {
    if (!env.MONGO_URL)
        return Promise.reject(new Error('MONGO_URL is not set'));

    if (!connection) {
        connection = mongoose.connect(env.MONGO_URL).catch((error) => {
            connection = null;
            throw error;
        });
    }

    return connection;
}
