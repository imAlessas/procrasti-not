<script lang='ts'>
    import type { DatabaseTodo } from '$lib/database/interfaces';


    import {
        removeTodo,
        completeTodo,
    } from '$lib/utils/index';


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

<style lang="scss">
   @use '$lib/styles/style.scss' as *;
</style>



<li class="todo-item {todo.isDone ? 'completed' : ''}">
    <div class="left-content">
        <button class="action-button complete non-selectable" onclick={ () => complete(todo._id.toString())}> ✅ </button>
        <span class="todo-text"> {todo.text} </span>
    </div>

    <button class="action-button delete non-selectable" onclick={ () => remove(todo._id.toString()) }> 🗑️ </button>
</li>
