import mongoose, { type InferSchemaType } from 'mongoose';
import { THEMES } from '$lib/utils/theme';

export const MAX_TODO_LENGTH = 500;

const todosSchema = new mongoose.Schema({
    _idUser: { type: mongoose.Schema.Types.ObjectId, required: true },
    text: { type: String, required: true, trim: true, maxlength: MAX_TODO_LENGTH },
    isDone: { type: Boolean, required: true, default: false },
    created: { type: Number, required: true, default: () => Date.now() },
    completed: { type: Number, default: null },
    deleted: { type: Number, default: null },
});
todosSchema.index({ _idUser: 1, deleted: 1, created: 1 });

const usersSchema = new mongoose.Schema({
    logtoId: { type: String, required: true, unique: true },
    username: String,
    email: String,
    created: { type: Number, required: true, default: () => Date.now() },
    theme: { type: String, enum: THEMES, default: 'dark' },
});

export type TodoDoc = InferSchemaType<typeof todosSchema> & { _id: mongoose.Types.ObjectId };
export type UserDoc = InferSchemaType<typeof usersSchema> & { _id: mongoose.Types.ObjectId };

export const Todos = (mongoose.models.Todos as mongoose.Model<TodoDoc>) || mongoose.model<TodoDoc>('Todos', todosSchema);
export const Users = (mongoose.models.Users as mongoose.Model<UserDoc>) || mongoose.model<UserDoc>('Users', usersSchema);
