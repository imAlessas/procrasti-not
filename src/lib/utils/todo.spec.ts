import { describe, expect, it } from 'vitest';
import { removeTodo, replaceTodo, sortTodoList } from './todo';
import type { TodoDTO } from '$lib/types';

const todo = (id: string, isDone: boolean): TodoDTO => ({ id, text: id, isDone, created: 0, completed: null });

describe('todo utils', () => {
    it('puts completed todos last and keeps the order inside each group', () => {
        const sorted = sortTodoList([todo('a', true), todo('b', false), todo('c', true), todo('d', false)]);
        expect(sorted.map((t) => t.id)).toEqual(['b', 'd', 'a', 'c']);
    });

    it('removes a todo by id without mutating the input', () => {
        const list = [todo('a', false), todo('b', false)];
        expect(removeTodo(list, 'a').map((t) => t.id)).toEqual(['b']);
        expect(list).toHaveLength(2);
    });

    it('replaces a todo by id', () => {
        const list = [todo('a', false), todo('b', false)];
        expect(replaceTodo(list, { ...list[1], isDone: true })[1].isDone).toBe(true);
        expect(list[1].isDone).toBe(false);
    });
});
