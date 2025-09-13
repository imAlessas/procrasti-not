import type { DatabaseTodo } from "$lib/database/interfaces";
import { RANDOM_TODO_URL } from "./const";



// Fetches a random todo item from the server.
export async function getRandomTodo(): Promise<string> {
    return (await (await fetch(RANDOM_TODO_URL)).json())[0].todo;
}


// Sorts the todo list by separating uncompleted and completed items.
export function sortTodoList(todoList: DatabaseTodo[]) : DatabaseTodo[] {
    const uncompleted = todoList.filter((item: any) => !item.isDone);
    const completed = todoList.filter((item: any) => item.isDone);
    return [...uncompleted, ...completed];
}



// Inserts a new todo item into the todo list.
export function insertTodo(todoList: DatabaseTodo[], todo: DatabaseTodo) : DatabaseTodo[] {
    return [...todoList, todo];
}



// Toggles the completion status of a todo item by its ID.
export function completeTodo(todoList: DatabaseTodo[], id: number) : DatabaseTodo[] {
    return todoList.filter((item: any) => {
        item.completed = (item.id === id ? !item.completed : item.completed);
        return item;
    });
}



// Removes a todo item from the list by its ID.
export function removeTodo(todoList: DatabaseTodo[], id: string) : DatabaseTodo[] {
    return todoList.filter((item: DatabaseTodo) => {
        return item._id.toString() !== id;
    });
}
