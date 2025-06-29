import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const todosSchema = new mongoose.Schema({
    _id: ObjectId,
    _idUser: ObjectId,     // External key
    text: String,
    created: Number,
    isDone: Boolean,
    completed: Number,
    
});

export const Todos = mongoose.models.Todos || mongoose.model('Todos', todosSchema);

