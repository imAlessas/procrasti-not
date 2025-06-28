<style lang="scss">
   @use '$lib/styles/style.scss' as *;
</style>

<script lang='ts'>
    import type { DatabaseTodo } from '$lib/database/interfaces';


    import { removeTodo } from '$lib/utils/listActions';
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
        <ActionButton type="complete" onClick={() => complete(todo._id.toString())} icon="streamline-ultimate:check-double"/>
        <span class="todo-text"> {todo.text} </span>
    </div>

    <ActionButton type="delete" onClick={() => remove(todo._id.toString())} icon="streamline-ultimate:bin-1"/>
</li>
