import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String
});

export const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
