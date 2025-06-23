<style lang="scss">
   @use '$lib/styles/style.scss' as *;
</style> 

<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { saveJson, sortTodoList, getRandomTodo, insertTodo} from '$lib/utils/index';

    // Components
    import TodoList from '../../components/TodoList.svelte';
    import TodoForm from '../../components/TodoDialog.svelte';
    import { LOGGED_USER_SESSION } from '$lib/utils/const';
    import type { DatabaseTodo, DatabaseUser } from '$lib/database/interfaces';
    import type { ObjectId } from 'mongodb';
    import PrimaryButton from '../../components/generics/PrimaryButton.svelte';
    import SecondaryButton from '../../components/generics/SecondaryButton.svelte';
    import Icon from '../../components/generics/Icon.svelte';
    import IconButton from '../../components/generics/IconButton.svelte';

    
    let todoList: DatabaseTodo[] = [];
    let loggedUser : DatabaseUser;
    
    let addTodoClicked = false;



    function updateTodoList(new_list : DatabaseTodo[]) : void {
        todoList = sortTodoList(new_list);
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


    function showDialog(value : boolean) : void {
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
            
            todoList = sortTodoList(await retrieveTodos(loggedUser._id));

        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    });


</script>




<div class="app-container">

    <form method="POST" action="?/signOut" class="signout-form">
        <IconButton icon="streamline-ultimate:smiley-sad-1-bold" text="Sign out"/>
    </form>

    <div class="todo-container" in:fade={{ duration: 1000 }}>
        
        <div class="header">
            <h1>Todo List</h1>
            
            <div class="button-container">
                <SecondaryButton onClick={() => insertRandomTodo()}>
                    <Icon icon="streamline-ultimate:dice-bold"/>
                </SecondaryButton>

                <PrimaryButton onClick={ () => showDialog(true)}>
                    <Icon icon="streamline-ultimate:add-circle-bold-bold"/>
                </PrimaryButton>
            </div>
            
        </div>

        {#if todoList.length >0}
            <TodoList
                todoList={todoList}
                {updateTodoList}
            />
        {:else}
            <div class="nothing-todo non-selectable" in:fade={{ delay: 500 }}> Nothing to do! </div>    
        {/if}

        {#if addTodoClicked}
            <TodoForm
                {loggedUser}
                {todoList}
                {showDialog}
                {updateTodoList}
            />
        {/if}

    </div>
</div>
