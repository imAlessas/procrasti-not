import type { TodoDTO } from '$lib/types';
import { RANDOM_TODO_URL } from './const';

const FALLBACK_TODOS = [
    'Reorganize the sock drawer',
    'Learn to juggle',
    'Water the plants',
    'Write a letter to future me',
    'Alphabetize the spice rack',
];

// Fetches a random todo text; falls back to a built-in list when the external service is unavailable.
export async function getRandomTodo(): Promise<string> {
    try {
        const response = await fetch(RANDOM_TODO_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const text = (await response.json())?.[0]?.todo;
        if (typeof text === 'string' && text.length > 0) return text;
    } catch {
        /* use the fallback */
    }

    return FALLBACK_TODOS[Math.floor(Math.random() * FALLBACK_TODOS.length)];
}

// Uncompleted todos first, then completed ones; the original order is kept inside each group.
export function sortTodoList(todoList: TodoDTO[]): TodoDTO[] {
    return [
        ...todoList.filter((todo) => !todo.isDone),
        ...todoList.filter((todo) => todo.isDone),
    ];
}

export function removeTodo(todoList: TodoDTO[], id: string): TodoDTO[] {
    return todoList.filter((todo) => todo.id !== id);
}

export function replaceTodo(todoList: TodoDTO[], updated: TodoDTO): TodoDTO[] {
    return todoList.map((todo) => (todo.id === updated.id ? updated : todo));
}
