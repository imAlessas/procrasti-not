import { Todos } from "$lib/models/todos";
import { Users } from "$lib/models/users";
import { ObjectId } from "mongodb";
import type { DatabaseTodo, DatabaseUser } from "./interfaces";
import { connectToMongoDB } from "./mongoose";
import type { UpdateResult } from "mongoose";

function removeMongoID(doc: any) : DatabaseTodo {
    const { _id, ...rest } = doc;
    return { ...rest }
}




export const findUserByLogtoId = async (id : string) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();

    const constraints = { logtoId: id  }
    const user = await Users.findOne(constraints).lean<DatabaseUser | null>();

    return user ?? null;

};

export const createUser = async (newUser : DatabaseUser) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();


    return await Users.create(newUser);

};

export const updateTheme = async (userId : ObjectId, theme : string) : Promise<Boolean> => {
    await connectToMongoDB();

    const response : UpdateResult = await Users.updateOne(
        {  _id: userId  },
        { $set : {
            theme: theme,
        }}
    );
    

    return response.matchedCount == 1 && response.modifiedCount == 1;

};



export const findTodos = async (_idUser : ObjectId) : Promise<DatabaseTodo[] | null> => {
    await connectToMongoDB();

    const constraints = { _idUser: _idUser  }
    const todos = await Todos.find(constraints).lean<DatabaseTodo[] | null>();

    return todos ?? null

}; 

export const createTodo = async (newTodo : DatabaseTodo) : Promise<DatabaseTodo> => {
    await connectToMongoDB();

    return await Todos.create(newTodo);

};

export const completeTodo = async (todoId : ObjectId) : Promise<Boolean> => {
    await connectToMongoDB();

    const response : UpdateResult = await Todos.updateOne(
        {  _id: todoId  },
        { $set : {
            isDone: true,
            completed: Date.now()
        }}
    );

    return response.matchedCount == 1 && response.modifiedCount == 1;

};

export const uncompleteTodo = async (todoId : ObjectId) : Promise<Boolean> => {
    await connectToMongoDB();

    const response : UpdateResult = await Todos.updateOne(
        {  _id: todoId  },
        { $set : {
            isDone: false,
            completed: null
        }}
    );

    return response.matchedCount == 1 && response.modifiedCount == 1;

};

export const deleteTodo = async (todoId : ObjectId) : Promise<Boolean> => {
    await connectToMongoDB();

    const result = await Todos.deleteOne({_id: todoId});

    return result.deletedCount == 1;

};
