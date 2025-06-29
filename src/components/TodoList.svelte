<script lang='ts'>
    import type { DatabaseTodo } from "$lib/database/interfaces";


    import TodoItem from "./TodoItem.svelte";
    
    export let todoList:DatabaseTodo[];
    export let updateTodoList: (list : DatabaseTodo[]) => void;

</script>

<style>
    .todo-list {
        list-style-type: none;
        padding: 0;
    }
</style>



<ul class="todo-list">
    {#each todoList as todo}
        <TodoItem
            {updateTodoList}
            {todoList}
            {todo}
        />
    {/each}
</ul>
        