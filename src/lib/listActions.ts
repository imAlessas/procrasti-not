import type { TodoType, TodoListType } from '$lib/types';



/**
 * Sorts the todo list by separating uncompleted and completed items.
 * 
 * @param {TodoListType} todo_list - The current list of todos.
 * @returns {TodoListType} - A new array with uncompleted items first, followed by completed items.
 */
export function sortTodoList(todo_list: TodoListType) : TodoListType {
    const uncompleted = todo_list.filter((item: any) => !item.completed);
    const completed = todo_list.filter((item: any) => item.completed);
    return [...uncompleted, ...completed];
}



/**
 * Updates the length of the todo list.
 * 
 * @param {TodoListType} todo_list - The current list of todos.
 * @returns {number} - The length of the todo list.
 */
export function updateLength(todo_list: TodoListType) : number {
    return todo_list.length;
}



/**
 * Inserts a new todo item into the todo list.
 * 
 * @param {TodoListType} todo_list - The current list of todos.
 * @param {TodoType} todo - The new todo item to be added.
 * @returns {TodoListType} - A new array with the added todo item.
 */
export function insertTodo(todo_list: TodoListType, todo: TodoType) : TodoListType {
    return [...todo_list, todo];
}



/**
 * Toggles the completion status of a todo item by its ID.
 * 
 * @param {TodoListType} todo_list - The current list of todos.
 * @param {number} id - The ID of the todo item to be toggled.
 * @returns {TodoListType} - A new array with the updated completion status.
 */
export function completeTodo(todo_list: TodoListType, id: number) : TodoListType {
    return todo_list.filter((item: any) => {
        item.completed = (item.id === id ? !item.completed : item.completed);
        return item;
    });
}



/**
 * Removes a todo item from the list by its ID.
 * 
 * @param {TodoListType} todo_list - The current list of todos.
 * @param {number} id - The ID of the todo item to be removed.
 * @returns {TodoListType} - A new array with the todo item removed.
 */
export function removeTodo(todo_list: TodoListType, id: number) : TodoListType {
    return todo_list.filter((item: any) => {
        return item.id !== id;
    });
}
