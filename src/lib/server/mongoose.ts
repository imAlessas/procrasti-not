import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongoose;
if (!cached)
	cached = global.mongoose = { conn: null, promise: null };

export async function connectToMongoDB() {

	if (cached.conn)
        return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGO_URL)
			.then( (mongoose) => { return mongoose;} );
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
