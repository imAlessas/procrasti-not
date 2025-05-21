import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';


let isConnected = false;

export async function connectDB() {
    if (isConnected)
        return;

    await mongoose.connect(env.MONGO_URL!);

    isConnected = true;
    console.log('MongoDB connected');
}
