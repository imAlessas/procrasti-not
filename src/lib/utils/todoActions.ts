import { TODO_ID_OFFSET, RANDOM_TODO_URL } from "$lib/utils/const";

import type {TodoType, TodoListType} from "$lib/utils/types"



/**
 * Retrieves the maximum ID from a list of to-do items.
 * 
 * @param {DatabaseTodo[]} todoList - The list of to-do items.
 * @returns {number} - The maximum ID found in the list, or TODO_ID_OFFSET if no ID exceeds it.
 */
function retrieveMaxId(todoList: DatabaseTodo[]) : number {
    // Find the maximum ID in the list
    let max_from_list = Math.max(...todoList.map((item: any) => item.id));
  
    return max_from_list > TODO_ID_OFFSET ? max_from_list : TODO_ID_OFFSET;
}



export async function getRandomTodo() : Promise<DatabaseTodo> {
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
 * @param {DatabaseTodo[]} todoList - The list of existing to-do items.
 * @returns {TodoType} - The new to-do item schema.
 */
export function createTodoSchema(todoValue: string, todoList: DatabaseTodo[]) : DatabaseTodo {
    return {
        todoId: (1 + retrieveMaxId(todoList)),  // Assign a unique ID by incrementing the maximum ID from the list
        text: todoValue,
        created: Date.now(),
        isDone: false,
        completed: null,
        userId: ""
    };
}

