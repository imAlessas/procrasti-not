import { Todos } from "$lib/models/todos";
import { Users } from "$lib/models/users";
import { ObjectId } from "mongodb";
import type { DatabaseTodo, DatabaseUser } from "./interfaces";
import { connectToMongoDB } from "./mongoose";
import type { UpdateResult } from "mongoose";



// Retruns the user object provided by the Logto ID, null otherwise
export const findUserByLogtoId = async (id : string) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();

    const constraints = { logtoId: id  }
    const user = await Users.findOne(constraints).lean<DatabaseUser | null>();

    return user ?? null;

};


// Creates a new user 
export const createUser = async (newUser : DatabaseUser) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();

    return await Users.create(newUser);

};


// Updates the theme given the user ID and the new theme
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


// Retrieves all TODOs of a user
export const findTodos = async (_idUser : ObjectId) : Promise<DatabaseTodo[] | null> => {
    await connectToMongoDB();

    const constraints = { _idUser: _idUser, deleted: null  }
    const todos = await Todos.find(constraints).lean<DatabaseTodo[] | null>();

    return todos ?? null

}; 


// Creates a new todo
export const createTodo = async (newTodo : DatabaseTodo) : Promise<DatabaseTodo> => {
    await connectToMongoDB();

    return await Todos.create(newTodo);

};


// Marks the todo as completed and updates the complete date
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


// Marks the todo as not completed and nullifies the complete date
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

// Marks the todo as not completed and nullifies the complete date
export const editTodo = async (todoId : ObjectId, newText: string) : Promise<Boolean> => {
    await connectToMongoDB();

    const response : UpdateResult = await Todos.updateOne(
        {  _id: todoId  },
        { $set : {
            text: newText
        }}
    );

    return response.matchedCount == 1 && response.modifiedCount == 1;

};


// It updates the date, instead of removing it from the database
export const deleteTodo = async (todoId : ObjectId) : Promise<Boolean> => {
    await connectToMongoDB();

    const response : UpdateResult = await Todos.updateOne(
        {  _id: todoId  },
        { $set : {
            deleted: Date.now()
        }}
    );

    return response.matchedCount == 1 && response.modifiedCount == 1;

};
