import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const usersSchema = new mongoose.Schema({
    _id: ObjectId,
    logtoId: String,
    username: String,
    email: String,
    created: Number,
    theme: String,
});

export const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
