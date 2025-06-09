import { TODO_ID_OFFSET, RANDOM_TODO_URL } from "$lib/utils/const";

import type {TodoType, TodoListType} from "$lib/utils/types"



/**
 * Retrieves the maximum ID from a list of to-do items.
 * 
 * @param {TodoListType} todo_list - The list of to-do items.
 * @returns {number} - The maximum ID found in the list, or TODO_ID_OFFSET if no ID exceeds it.
 */
function retrieveMaxId(todo_list: TodoListType) : number {
    // Find the maximum ID in the list
    let max_from_list = Math.max(...todo_list.map((item: any) => item.id));
  
    return max_from_list > TODO_ID_OFFSET ? max_from_list : TODO_ID_OFFSET;
}



/**
 * Fetches a random todo item from the specified URL, marks it as not completed,
 * and adds it to the existing todo list.
 * @param todo_list - The current list of todos.
 * @returns A new array with the added random todo item.
 */
export async function getRandomTodo() : Promise<TodoType> {
    const response = await fetch(RANDOM_TODO_URL);

    let todo = await response.json();

    todo.forEach((item: any) => {
        item.completed = false;
        delete item.userId;
    });

    return todo[0];
}



/**
 * Creates a new to-do item schema with a unique ID.
 * 
 * @param {string} todoValue - The description of the to-do item.
 * @param {TodoListType} todo_list - The list of existing to-do items.
 * @returns {TodoType} - The new to-do item schema.
 */
export function createTodoSchema(todoValue: string, todo_list: TodoListType) : TodoType {
    return {
        id: (1 + retrieveMaxId(todo_list)),  // Assign a unique ID by incrementing the maximum ID from the list
        todo: todoValue,
        completed: false,
    };
}

