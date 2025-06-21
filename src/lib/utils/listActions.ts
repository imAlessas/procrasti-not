import type { DatabaseTodo } from "$lib/database/interfaces";

/**
 * Sorts the todo list by separating uncompleted and completed items.
 * 
 * @param {DatabaseTodo[]} todoList - The current list of todos.
 * @returns {DatabaseTodo[]} - A new array with uncompleted items first, followed by completed items.
 */
export function sortTodoList(todoList: DatabaseTodo[]) : DatabaseTodo[] {
    const uncompleted = todoList.filter((item: any) => !item.isDone);
    const completed = todoList.filter((item: any) => item.isDone);
    return [...uncompleted, ...completed];
}




/**
 * Inserts a new todo item into the todo list.
 * 
 * @param {DatabaseTodo[]} todoList - The current list of todos.
 * @param {DatabaseTodo} todo - The new todo item to be added.
 * @returns {DatabaseTodo[]} - A new array with the added todo item.
 */
export function insertTodo(todoList: DatabaseTodo[], todo: DatabaseTodo) : DatabaseTodo[] {
    return [...todoList, todo];
}



/**
 * Toggles the completion status of a todo item by its ID.
 * 
 * @param {DatabaseTodo[]} todoList - The current list of todos.
 * @param {number} id - The ID of the todo item to be toggled.
 * @returns {DatabaseTodo[]} - A new array with the updated completion status.
 */
export function completeTodo(todoList: DatabaseTodo[], id: number) : DatabaseTodo[] {
    return todoList.filter((item: any) => {
        item.completed = (item.id === id ? !item.completed : item.completed);
        return item;
    });
}



/**
 * Removes a todo item from the list by its ID.
 * 
 * @param {DatabaseTodo[]} todoList - The current list of todos.
 * @param {number} id - The ID of the todo item to be removed.
 * @returns {DatabaseTodo[]} - A new array with the todo item removed.
 */
export function removeTodo(todoList: DatabaseTodo[], id: string) : DatabaseTodo[] {
    return todoList.filter((item: DatabaseTodo) => {
        return item._id.toString() !== id;
    });
}
