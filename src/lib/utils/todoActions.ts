import type { DatabaseTodo } from "$lib/database/interfaces";
import { RANDOM_TODO_URL } from "$lib/utils/const";





export async function getRandomTodo() : Promise<string> {
    return (await (await fetch(RANDOM_TODO_URL)).json())[0].todo;
}



/**
 * Creates a new to-do item schema with a unique ID.
 * 
 * @param {string} todoValue - The description of the to-do item.
 * @param {DatabaseTodo[]} todoList - The list of existing to-do items.
 * @returns {TodoType} - The new to-do item schema.
 */
export function createTodoSchema(todoValue: string, todoList: DatabaseTodo[]) {
    return {
        _id: undefined,
        text: todoValue,
        created: Date.now(),
        isDone: false,
        completed: null,
        _idUser: ""
    };
}
