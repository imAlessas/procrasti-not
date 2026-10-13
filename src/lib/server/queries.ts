import { Types } from 'mongoose';
import type { UserInfoResponse } from '@logto/sveltekit';
import type { TodoDTO, UserDTO } from '$lib/types';
import { connectToMongoDB } from './db';
import { Todos, Users, type TodoDoc, type UserDoc } from './models';

export const toTodoDTO = (todo: TodoDoc): TodoDTO => ({
    id: todo._id.toString(),
    text: todo.text,
    isDone: todo.isDone,
    created: todo.created,
    completed: todo.completed ?? null,
});

export const toUserDTO = (user: UserDoc): UserDTO => ({
    id: user._id.toString(),
    username: user.username ?? undefined,
    email: user.email ?? undefined,
    theme: user.theme ?? 'dark',
});


// ---------- Users ----------

// Returns the user with the given Logto ID, creating it atomically if it does not exist yet.
export async function findOrCreateUser(logtoUser: UserInfoResponse): Promise<UserDoc> {
    await connectToMongoDB();

    const upsert = () => Users.findOneAndUpdate(
        { logtoId: logtoUser.sub },
        {
            $setOnInsert: {
                logtoId: logtoUser.sub,
                username: logtoUser.username ?? undefined,
                email: logtoUser.email ?? undefined,
                created: Date.now(),
                theme: 'dark',
            },
        },
        { upsert: true, new: true }
    ).lean<UserDoc>();

    try {
        return (await upsert())!;
    } catch (error: any) {
        // Two concurrent first requests can race on the unique index: the loser just reads.
        if (error?.code !== 11000) throw error;
        return (await Users.findOne({ logtoId: logtoUser.sub }).lean<UserDoc>())!;
    }
}

export async function updateTheme(userId: string, theme: string): Promise<boolean> {
    await connectToMongoDB();

    const response = await Users.updateOne({ _id: new Types.ObjectId(userId) }, { $set: { theme } });
    return response.matchedCount === 1;
}


// ---------- Todos (every query is scoped to the owner) ----------

export async function findTodos(userId: string): Promise<TodoDTO[]> {
    await connectToMongoDB();

    const todos = await Todos
        .find({ _idUser: new Types.ObjectId(userId), deleted: null })
        .sort({ created: 1 })
        .lean<TodoDoc[]>();

    return todos.map(toTodoDTO);
}

export async function createTodo(userId: string, text: string): Promise<TodoDTO> {
    await connectToMongoDB();

    const todo = await Todos.create({ _idUser: new Types.ObjectId(userId), text });
    return toTodoDTO(todo.toObject() as TodoDoc);
}

// Applies a partial update; returns null when the todo does not exist, is deleted, or is not owned by the user.
export async function updateTodo(
    userId: string,
    todoId: string,
    patch: { text?: string; isDone?: boolean }
): Promise<TodoDTO | null> {
    await connectToMongoDB();

    const set: Record<string, unknown> = {};
    if (patch.text !== undefined) set.text = patch.text;
    if (patch.isDone !== undefined) {
        set.isDone = patch.isDone;
        set.completed = patch.isDone ? Date.now() : null;
    }

    const todo = await Todos.findOneAndUpdate(
        { _id: new Types.ObjectId(todoId), _idUser: new Types.ObjectId(userId), deleted: null },
        { $set: set },
        { new: true, runValidators: true }
    ).lean<TodoDoc>();

    return todo ? toTodoDTO(todo) : null;
}

// Soft delete: the document is kept and flagged with the deletion date.
export async function deleteTodo(userId: string, todoId: string): Promise<boolean> {
    await connectToMongoDB();

    const response = await Todos.updateOne(
        { _id: new Types.ObjectId(todoId), _idUser: new Types.ObjectId(userId), deleted: null },
        { $set: { deleted: Date.now() } }
    );
    return response.matchedCount === 1;
}
