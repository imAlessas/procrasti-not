import type { ObjectId } from 'mongodb';

export interface DatabaseUser {
    _id: ObjectId;
    logtoId: string;
    username: string;
    email: string;
    created: number;
    theme: string;
}

export interface DatabaseTodo {
    _id: ObjectId;
    _idUser: ObjectId;
    text: string;
    isDone: boolean;
    created: number;
    completed: number | null;
    deleted: number | null;
}
