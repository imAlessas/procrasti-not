<script lang='ts'>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    import { saveJson, updateLength, sortTodoList, getRandomTodo, insertTodo} from '$lib/utils/index';

    // Components
    import TodoList from '../../components/TodoList.svelte';
    import TodoForm from '../../components/TodoForm.svelte';
    import { LOGGED_USER_SESSION } from '$lib/utils/const';
    import type { DatabaseTodo, DatabaseUser } from '$lib/database/interfaces';
    import type { ObjectId } from 'mongodb';



    // Variables
    let todoSize: number;
    let addTodoClicked = false;
    
    let todoList: DatabaseTodo[];
    let loggedUser : DatabaseUser;






    function updateTodoList(new_list : DatabaseTodo[]) : void {
        todoList = sortTodoList(new_list);
        todoSize = updateLength(todoList);
        saveJson(todoList);
    }


    async function insertRandomTodo() : Promise<void> {

        const text = await getRandomTodo();

        const response = await fetch(`/api/todos/1`, {
            method: 'POST',
            body:JSON.stringify({
                text : text,
                _idUser : loggedUser._id
            })
        });


        todoList = insertTodo(todoList, await response.json())
        updateTodoList(todoList);
    }


    function showModal(value : boolean) : void {
        addTodoClicked = value
    }




    async function retrieveTodos(_idUser:ObjectId) : Promise<DatabaseTodo[]> {
        
        let todos : DatabaseTodo[] = [];
        const response = await fetch(`/api/todos/${_idUser}`, {method: 'GET'});
        const json = await response.json();

        if (json.error) {
            console.debug(json.error);
            return todos;
        }
        
        todos = json;
        return todos;

    }




    onMount(async () => {
        try {

            const userJson = sessionStorage.getItem(LOGGED_USER_SESSION);
            if (!userJson)
                return;

            loggedUser = JSON.parse(userJson);
            
            todoList = await retrieveTodos(loggedUser._id);
            todoSize = todoList.length;

        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    });


</script>


<div class="app-container">

    <form method="POST" action="?/signOut" class="signout-form">
        <button type="submit" class="signout-button non-selectable">Sign out</button>
    </form>

    <div class="todo-container" in:fade={{ duration: 1000 }}>
        
        <div class="header">
            <h1>Todo List</h1>
            
            <div class="button-container">

                <button class="add-random-button non-selectable" onclick={ () => insertRandomTodo() }>
                    <span class="not-cover">🎲</span>
                </button>

                <!-- <button class="add-button non-selectable" onclick={ () => showModal(true) }>➕</button> -->
            </div>
            
        </div>

        {#if todoSize !== 0}
            <TodoList
                todoList={todoList}
                {updateTodoList}
            />
        {:else}
            <div class="nothing-todo non-selectable"> Nothing to do! </div>    
        {/if}

        {#if addTodoClicked}
            <TodoForm 
                todoList={todoList}
                {showModal}
                {updateTodoList}
            />
        {/if}

    </div>
</div>


<style>

    .non-selectable {
        user-select: none; /* Standard syntax */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }

    /* Fancy moving gradient */
    :global(body) {
        background: linear-gradient(135deg, #ffcb6b, #FCFCFC, #ADD8E6);
        background-size: 150% 150%;
        animation: waveAnimation 15s ease-in-out infinite;
        font-family: 'Futura', sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    @keyframes waveAnimation {
        0% { background-position: 0% 50%; }
        25% { background-position: 50% 100%; }
        50% { background-position: 100% 50%; }
        75% { background-position: 50% 0%; }
        100% { background-position: 0% 50%; }
    }

    .todo-container {
        background-color: rgba(255,255,255,0.2);
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 400px;
        padding: 20px;
        animation: fadeIn 1s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .header h1 {
        margin: 0;
        font-size: 24px;
        color: #333;
    }

    .button-container {
        display: flex;
        gap: 10px; /* Adjust the spacing between buttons as needed */
    }

    .add-button {
        background: linear-gradient(135deg, #FFA500, #ADD8E6);
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-family: 'Futura', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background 0.3s ease, transform 0.2s ease;
    }

    .add-button:hover {
        background: linear-gradient(135deg, #FF8C00, #87CEEB);
        transform: scale(105%);
    }

    .add-button:active {
        transform: scale(95%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .add-random-button {
        position: relative;
        background: linear-gradient(135deg, #FFA500, #ADD8E6);
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-family: 'Futura', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
    }

    .add-random-button .not-cover {
        z-index: 2;
        position: relative;
    }

    .add-random-button::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        right: 3px;
        bottom: 3px;
        background: white;
        border-radius: 7px; /* Adjust to be slightly smaller than the button */
        z-index: 1;
        transition: opacity 0.3s ease;
    }

    .add-random-button:hover::after {
        opacity: 0;
    }

    .add-random-button:hover {
        transform: scale(105%);
    }

    .add-random-button:active {
        transform: scale(95%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .nothing-todo {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 15px;
        font-size: 18px;
        animation: fadeIn 2s ease-in-out;
    }


.signout-form {
    position: absolute;
    top: 30px;
    right: 50px;
    z-index: 10;
}

.signout-button {
    background: linear-gradient(135deg, #FFA500, #ADD8E6);
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Futura', sans-serif;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease, transform 0.2s ease;
}

.signout-button:hover {
    background: linear-gradient(135deg, #FF8C00, #87CEEB);
    transform: scale(105%);
}

.signout-button:active {
    transform: scale(95%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
