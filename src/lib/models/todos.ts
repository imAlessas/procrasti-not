import mongoose from 'mongoose';

const todosSchema = new mongoose.Schema({
    todoId: String,
    text: String,
    created: Number,
    isDone: Boolean,
    completion: Number,

    
    
    userId: String,     // External key
});

export const Todos = mongoose.models.Todos || mongoose.model('Todos', todosSchema);
