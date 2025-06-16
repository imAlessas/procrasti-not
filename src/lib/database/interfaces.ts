import type { ObjectId } from 'mongodb';

export interface DatabaseUser {
  _id: ObjectId;
  logtoId: string;
  username: string;
  email: string;
  created: number;
}

export interface DatabaseTodo {
    _id: ObjectId | undefined;
    text: string;
    created: number;
    isDone: boolean;
    completed: number | null;
    _idUser: ObjectId;
}
