<script lang='ts'>

    let { 
        updateTodoList = $bindable(),
        todo_list = $bindable(),
        todo } = $props();

    
    import {
        removeTodo,
        completeTodo
    } from '$lib/index';


    function remove(id: number) {
        todo_list = removeTodo(todo_list, id);
        updateTodoList();
    }

    function complete(id: number) {
        todo_list = completeTodo(todo_list, id);
        updateTodoList();
    }


</script>


<style>
    .non-selectable {
        user-select: none; /* Standard syntax */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }

    .todo-item {
        font-family: 'Futura', sans-serif;
        background-color: rgba(249, 249, 249, 0.5);
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .left-content {
        display: flex;
        align-items: center;
    }

    .todo-text {
        text-align: justify;
        padding-left: 15px;
        padding-right: 15px;
    }

    .todo-item.completed span {
        text-decoration: line-through;
        color: #999;
    }

    .complete-button, .delete-button {
        background: none;
        border: 2px solid;
        color: white;
        padding: 5px 10px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background 0.3s ease, transform 0.2s ease;
    }

    .complete-button {
        background: none;
        border: none;
        padding: 10px 10px;
        border-radius: 100%;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
    }

    .complete-button:hover {
        background: linear-gradient(135deg, rgba(72, 220, 126, 0.8), #FFFFFF);
        color: white;
        transform: scale(102.5%);
    }

    .complete-button:active {
        transform: scale(97.5%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .delete-button {
        background: none;
        border: none;
        padding: 10px 10px;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
    }

    .delete-button:hover {
        background: linear-gradient(315deg, rgba(205,0,0, 0.6), #FFFFFF);
        color: white;
        transform: scale(102.5%);
    }

    .delete-button:active {
        transform: scale(97.5%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>




<li class="todo-item {todo.completed ? 'completed' : ''}">

    <div class="left-content">
        <button class="complete-button non-selectable" onclick={ () => complete(todo.id)}> ✅ </button>
        <span class="todo-text"> {todo.todo} </span>
    </div>

    <button class="delete-button non-selectable" onclick={ () => remove(todo.id) }> 🗑️ </button>
</li>

<!--  -->