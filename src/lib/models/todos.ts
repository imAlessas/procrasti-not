import mongoose from 'mongoose';

const todosSchema = new mongoose.Schema({
    todoId: Number,
    text: String,
    created: Number,
    isDone: Boolean,
    completed: Number,
    
    userId: String,     // External key
});

export const Todos = mongoose.models.Todos || mongoose.model('Todos', todosSchema);

