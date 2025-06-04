import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String
});

export const Users = mongoose.models.users || mongoose.model('users', usersSchema);
