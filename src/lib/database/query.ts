import { Todos } from "$lib/models/todos";
import { Users } from "$lib/models/users";
import type { ObjectId } from "mongodb";
import type { DatabaseTodo, DatabaseUser } from "./interfaces";
import { connectToMongoDB } from "./mongoose";

function removeMongoID(doc: any) : DatabaseTodo {
    const { _id, ...rest } = doc;
    return { ...rest }
}




export const findUserByLogtoId = async (id : string) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();

    const constraints = { logtoId: id  }
    const user = await Users.findOne(constraints).lean<DatabaseUser | null>();

    if (!user)
        return null;

    return {
        _id:        user._id,
        logtoId:    user.logtoId,
        username:   user.username,
        email:      user.email,
        created:    user.created
    }
};

export const createUser = async (newUser : DatabaseUser) : Promise<DatabaseUser | null> => {
    await connectToMongoDB();

    return await Users.create(newUser);

};



export const findTodos = async (_idUser : ObjectId) : Promise<DatabaseTodo[] | null> => {
    await connectToMongoDB();

    const constraints = { _idUser: _idUser  }
    const todos = await Todos.find(constraints).lean<DatabaseTodo[] | null>();

    if (!todos)
        return null;

    return todos;
}; 

export const createTodo = async (newTodo : DatabaseTodo) : Promise<DatabaseTodo | null> => {
    await connectToMongoDB();

    return await Todos.create(newTodo);

};
