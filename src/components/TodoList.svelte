<script lang='ts'>
    import type { DatabaseTodo } from "$lib/database/interfaces";
    import TodoItem from "./TodoItem.svelte";
    
    export let todoList: DatabaseTodo[];
    export let showDialog: (value: boolean) => void;
    export let updateTodoList: (list: DatabaseTodo[]) => void;
    export let selectTodo: (todo: DatabaseTodo) => void;

</script>



<ul class="todo-list">
    {#each todoList as todo}
        <TodoItem
            {todoList}
            {showDialog}
            {updateTodoList}
            {selectTodo}
            {todo}
        />
    {/each}
</ul>
   


<style lang="scss">
    .todo-list {
        list-style-type: none;
        padding: 0;
    }
</style>
