<script lang='ts'>
    import { ICONS } from '$lib/utils/const';
    import { removeTodo } from '$lib/utils/todo';
    import ActionButton from './generics/ActionButton.svelte';
    import type { DatabaseTodo } from '$lib/database/interfaces';


    export let todoList : DatabaseTodo[];
    export let todo : DatabaseTodo;
    export let updateTodoList : (list : DatabaseTodo[]) => void;
    export let showDialog: (value: boolean) => void;
    export let selectTodo: (todo : DatabaseTodo) => void;


    function todoClicked() {
        if( todo.isDone )
            return;
        
        selectTodo(todo)
        showDialog(true);
    }


    // Removes the clicked todo
    async function remove(todoId: string) : Promise<void> {

        const response = await fetch(`/api/todos/delete`, {
            method: 'DELETE',
            body:JSON.stringify({
                todoID: todoId.toString(),
            })
        });

        if (!await response.json())
            return;
        
        updateTodoList(
            removeTodo(todoList, todoId)
        );

    }

    // Marks the clicked todo as completed
    async function complete(todoId: string) : Promise<void> {

        const response = await fetch(`/api/todos/complete`, {
            method: 'PUT',
            body:JSON.stringify({
                todoID: todoId.toString(),
                complete: !todo.isDone
            })
        });
        
        if (!await response.json())
            return
        
        todo.isDone = !todo.isDone;
        updateTodoList(todoList);
    }


</script>



<li class="todo-item {todo.isDone ? 'completed' : ''}"  >
    <div class="check-todo">
        <ActionButton type="complete" onClick={() => complete(todo._id.toString())} icon={ICONS.check}/>
            
        <button onclick={ () => todoClicked() }>
            <div class="todo-text"> {todo.text} </div>
        </button>

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

        &.completed .todo-text {
            text-decoration: line-through;
            color: #999;
        }

        .check-todo {
            background-color: var(--bkg-todo-item);
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            width: 100%;

            button {
                all: unset;
                cursor: pointer;

                .todo-text {
                    text-align: justify;
                    padding-left: 15px;
                    padding-right: 15px;
                }
                
            }

        }

    }
</style>
