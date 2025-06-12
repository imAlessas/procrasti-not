import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    userId: String,
    username: String,
    email: String,
    created: Number
});

export const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
