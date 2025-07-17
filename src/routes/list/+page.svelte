<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { sortTodoList, insertTodo, getRandomTodo} from "$lib/utils/todo";

    // Components
    import TodoList from '../../components/TodoList.svelte';
    import TodoForm from '../../components/TodoDialog.svelte';
    import { ICONS } from '$lib/utils/const';
    import type { DatabaseTodo, DatabaseUser } from '$lib/database/interfaces';
    import type { ObjectId } from 'mongodb';
    import PrimaryButton from '../../components/generics/PrimaryButton.svelte';
    import SecondaryButton from '../../components/generics/SecondaryButton.svelte';
    import Icon from '../../components/generics/Icon.svelte';
    import IconButton from '../../components/generics/IconButton.svelte';
    import { goto } from '$app/navigation';

    export let data;

    
    let todoList: DatabaseTodo[] = [];
    let loggedUser : DatabaseUser;
    
    let addTodoClicked = false;



    function updateTodoList(new_list : DatabaseTodo[]) : void {
        todoList = sortTodoList(new_list);
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

            const user : DatabaseUser | undefined = data.loggedUser;
            if (!user) {
                goto("/");
                return;
            }

            loggedUser = user;
            
            todoList = sortTodoList(await retrieveTodos(loggedUser._id));

        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    });


</script>



<div class="app-container">

    <form method="POST" action="?/signOut" class="signout-form">
        <IconButton icon={ICONS.out} text="Sign out"/>
    </form>

    <div class="todo-container" in:fade={{ duration: 1000 }}>
        
        <div class="header non-selectable">
            <h1>Todo List</h1>
            
            <div class="button-container">
                <SecondaryButton onClick={() => insertRandomTodo()}>
                    <Icon icon={ICONS.dice}/>
                </SecondaryButton>

                <PrimaryButton onClick={ () => showDialog(true)}>
                    <Icon icon={ICONS.add}/>
                </PrimaryButton>
            </div>
            
        </div>

        {#if todoList.length >0}
            <TodoList {todoList} {updateTodoList} />
        {:else}
            <div class="nothing-todo non-selectable" in:fade={{ delay: 500 }}> Nothing to do! </div>    
        {/if}

        
        {#if addTodoClicked}
            <TodoForm {loggedUser} {todoList} {showDialog} {updateTodoList} />
        {/if}

    </div>
</div>



<style lang="scss">

    .app-container {
        display: flex;
        place-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;


        .signout-form {
            position: absolute;
            top: 2.5%;
            right: 2%;
        }

        .todo-container {
            background-color: var(--bkg-todo-list);
            border-radius: 10px;
            box-shadow: var(--container-box-shadow);
            width: 400px;
            padding: 20px;
            animation: fadeIn 1s ease-in-out;
            
            @media (max-width: 450px) {
                width: 80%;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                
                h1 {
                    margin: 0;
                    font-size: 24px;
                    color: var(--text-color);
                }
                
                .button-container {
                    display: flex;
                    gap: 10px;
                }
                
            }
            
            .nothing-todo {
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 15px;
                font-size: 18px;
            }

        }
    }
</style>
