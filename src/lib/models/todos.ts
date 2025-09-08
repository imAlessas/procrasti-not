import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const todosSchema = new mongoose.Schema({
    _id: ObjectId,
    _idUser: ObjectId,     // External key
    text: String,
    isDone: Boolean,
    created: Number,
    completed: Number,
    deleted: Number,
});

export const Todos = mongoose.models.Todos || mongoose.model('Todos', todosSchema);
