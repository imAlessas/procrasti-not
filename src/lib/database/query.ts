import { Todos } from "$lib/models/todos";
import { Users } from "$lib/models/users";
import { todo } from "node:test";
import { connectToMongoDB } from "./mongoose";

function removeMongoID(doc: any) : DatabaseTodo{
    const { _id, ...rest } = doc;
    return { ...rest }
}




export const findUserByLogtoId = async (id : string) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();

    const constraints = { userId: id  }
    const user = await Users.findOne(constraints).lean<DatabaseUser | null>();

    if (!user) return null;

    return {
        userId:     user.userId,
        username:   user.username,
        email:      user.email,
        created:    user.created
    }
};

export const createUser = async (newUser : DatabaseUser) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();

    await Users.create(newUser);

    return newUser;

};



export const findTodos = async (userId : string) : Promise<DatabaseTodo[] | null> => {
    await connectToMongoDB();

    const constraints = { userId: userId  }
    const todos = await Todos.find(constraints).lean<DatabaseTodo[] | null>();

    if (!todos)
        return null;

    return todos.map(removeMongoID);
}; 

export const createTodo = async (newTodo : DatabaseTodo) : Promise<DatabaseTodo | null> => {
    await connectToMongoDB();

    await Todos.create(newTodo);

    return newTodo;

};
