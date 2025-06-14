import { Users } from "$lib/models/Users";
import { connectToMongoDB } from "./mongoose";


function serialize(doc: any) {
    return {...doc};
}




export const findUser = async (id : string) : Promise<DatabaseUser | null> => {
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
