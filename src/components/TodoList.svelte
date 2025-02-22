<script lang='ts'>

    import type { TodoListType } from "$lib";

    import TodoItem from "./TodoItem.svelte";
    
    export let todo_list:TodoListType;
    export let updateTodoList: (list : TodoListType) => void;

</script>





<ul class="todo-list">
    {#each todo_list as todo}
        <TodoItem
            {updateTodoList}
            {todo_list}
            {todo}
        />
    {/each}
</ul>
        
        



<style>
    .todo-list {
        list-style-type: none;
        padding: 0;
    }
</style>
        