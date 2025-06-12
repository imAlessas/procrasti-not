import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

// Create the global variable mongoose
declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;                         // Active mongoose connection, if any
    promise: Promise<typeof import("mongoose")> | null;             // Promise of onging connection, if any
  };
}


// Retrieve the cached variable
let cached = global.mongoose;
if (!cached)    // If none, initialize it
	cached = global.mongoose = {
        conn: null,
        promise: null
    };


export async function connectToMongoDB() {

	if (cached.conn)
        return cached.conn;

    // If there is no connection attempt, start one
	if (!cached.promise)
		cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => {return mongoose;});

    // Cache the connection and return
	cached.conn = await cached.promise;
	return cached.conn;
}
