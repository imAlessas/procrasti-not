<script lang='ts'>
    import type { DatabaseTodo } from '$lib/database/interfaces';
    import { ICONS } from '$lib/utils/const';


    import { removeTodo } from '$lib/utils/todo';
    import ActionButton from './generics/ActionButton.svelte';


    export let todoList : DatabaseTodo[];
    export let todo : DatabaseTodo;
    export let updateTodoList : (list : DatabaseTodo[]) => void;



    // Removes the clicked todo
    async function remove(todoId: string) : Promise<void> {

        const response = await fetch(`/api/todos/${todoId}`, {method: 'DELETE'})

        if (!await response.json())
            return;
        
        updateTodoList(
            removeTodo(todoList, todoId)
        );

    }

    // Marks the clicked todo as completed
    async function complete(todoId: string) : Promise<void> {

        const response = await fetch(`/api/todos/${todoId}`, {
            method: 'PUT',
            body:JSON.stringify({
                complete: !todo.isDone
            })
        });
        
        if (!await response.json())
            return
        
        todo.isDone = !todo.isDone;
        updateTodoList(todoList);

    }


</script>



<li class="todo-item {todo.isDone ? 'completed' : ''}">
    <div class="check-todo">
        <ActionButton type="complete" onClick={() => complete(todo._id.toString())} icon={ICONS.check}/>
        <span class="todo-text"> {todo.text} </span>
    </div>

    <ActionButton type="delete" onClick={() => remove(todo._id.toString())} icon={ICONS.bin}/>
</li>



<style lang="scss">
    .todo-item {

        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.3s ease, transform 0.2s ease;
        gap: 10px;

        .check-todo {
            background-color: var(--bkg-todo-item);
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            width: 100%;
        }

        .todo-text {
            text-align: justify;
            padding-left: 15px;
            padding-right: 15px;
        }

        &.completed .todo-text {
            text-decoration: line-through;
            color: #999;
        }

    }
</style>
