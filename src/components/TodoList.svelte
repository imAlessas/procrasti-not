<script lang='ts'>

    import TodoItem from "./TodoItem.svelte";
    
    export let todoList:DatabaseTodo[];
    export let updateTodoList: (list : DatabaseTodo[]) => void;

</script>





<ul class="todo-list">
    {#each todoList as todo}
        <TodoItem
            {updateTodoList}
            {todoList}
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
        