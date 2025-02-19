<script lang='ts'>

    import TodoItem from "./TodoItem.svelte";
    
    let {
        todo_list = $bindable(),
        updateTodoList = $bindable() }
        = $props();



    // function removeTodo(id: number) {   
    //     todo_list = todo_list.filter( (item: any) => {
    //        return item.id !== id
    //     });

    //     updateTodoList();
    // }

    // function completeTodo(id: number) {
        
    //     todo_list = todo_list.filter( (item: any) => {
    //         item.completed = ( item.id === id ? !item.completed : item.completed );
    //         return item;
    //     });

    //     updateTodoList();

    // }

</script>

<style>
    .todo-list {
        list-style-type: none;
        padding: 0;
    }
</style>


<ul class="todo-list">
    {#each todo_list as todo, index}
        <TodoItem
            bind:updateTodoList={updateTodoList}
            bind:todo_list={todo_list}
            {todo}
        />
    {/each}
</ul>
        
        
        
        