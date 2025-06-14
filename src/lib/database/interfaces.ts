interface DatabaseUser {
    userId: string;
    username: string;
    email: string;
    created: number;
}

interface DatabaseTodo {
    todoId: number,
    text: string,
    created: number,
    isDone: boolean,
    completed: number | null,
    userId: string, 
}
