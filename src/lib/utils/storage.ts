import type { TodoListType } from '$lib/utils/types';


/**
 * Saves the todo list to local storage.
 * @param todo_list - The list of todos to be saved.
 */
export async function saveJson(todo_list: TodoListType) : Promise<void> {
    localStorage.setItem('todo_list', JSON.stringify(todo_list));
}



/**
 * Retrieves the todo list from local storage.
 * @returns The parsed todo list if it exists, otherwise undefined.
 */
export async function retriveJson() : Promise<TodoListType> {
    let savedJson = localStorage.getItem('todo_list');

    if (savedJson)
        return JSON.parse(savedJson);

    return [];
}
