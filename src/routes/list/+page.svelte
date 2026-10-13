<script lang="ts">
    import { fade } from "svelte/transition";
    import TodoList from "$lib/components/TodoList.svelte";
    import TodoDialog from "$lib/components/TodoDialog.svelte";
    import PrimaryButton from "$lib/components/generics/PrimaryButton.svelte";
    import SecondaryButton from "$lib/components/generics/SecondaryButton.svelte";
    import Icon from "$lib/components/generics/Icon.svelte";
    import IconButton from "$lib/components/generics/IconButton.svelte";
    import { api } from "$lib/utils/api";
    import { ICONS } from "$lib/utils/const";
    import { getRandomTodo, removeTodo, replaceTodo, sortTodoList } from "$lib/utils/todo";
    import type { TodoDTO } from "$lib/types";

    let { data } = $props();

    let todos = $state<TodoDTO[]>([]);
    let dialogOpen = $state(false);
    let editedTodo = $state<TodoDTO | undefined>(undefined);
    let errorMessage = $state("");

    // Initial list from the server, then kept in sync locally
    $effect.pre(() => {
        todos = data.todos;
    });

    const sortedTodos = $derived(sortTodoList(todos));

    function fail(error: unknown): void {
        errorMessage = (error as Error).message;
        setTimeout(() => (errorMessage = ""), 5000);
    }

    async function addTodo(text: string): Promise<TodoDTO> {
        const created = await api<TodoDTO>("POST", "/api/todos", { text });
        todos = [...todos, created];
        return created;
    }

    async function insertRandomTodo(): Promise<void> {
        try {
            await addTodo(await getRandomTodo());
        } catch (error) {
            fail(error);
        }
    }

    function openAddDialog(): void {
        editedTodo = undefined;
        dialogOpen = true;
    }

    function openEditDialog(todo: TodoDTO): void {
        editedTodo = todo;
        dialogOpen = true;
    }

    async function saveTodo(text: string): Promise<void> {
        if (editedTodo) {
            const updated = await api<TodoDTO>("PATCH", `/api/todos/${editedTodo.id}`, { text });
            todos = replaceTodo(todos, updated);
        } else {
            await addTodo(text);
        }

        dialogOpen = false;
    }

    // Optimistic update, rolled back when the server refuses it
    async function toggleTodo(todo: TodoDTO): Promise<void> {
        const previous = todos;
        const isDone = !todo.isDone;
        todos = replaceTodo(todos, { ...todo, isDone, completed: isDone ? Date.now() : null });

        try {
            todos = replaceTodo(todos, await api<TodoDTO>("PATCH", `/api/todos/${todo.id}`, { isDone }));
        } catch (error) {
            todos = previous;
            fail(error);
        }
    }

    async function deleteTodo(todo: TodoDTO): Promise<void> {
        const previous = todos;
        todos = removeTodo(todos, todo.id);

        try {
            await api("DELETE", `/api/todos/${todo.id}`);
        } catch (error) {
            todos = previous;
            fail(error);
        }
    }
</script>

<div class="app-container">
    <form method="POST" action="?/signOut" class="signout-form">
        <IconButton icon={ICONS.out} text="Sign out" type="submit" />
    </form>

    <div class="todo-container" in:fade={{ duration: 1000 }}>
        <div class="header non-selectable">
            <h1>Todo List</h1>

            <div class="button-container">
                <SecondaryButton label="Add a random todo" onClick={insertRandomTodo}>
                    <Icon icon={ICONS.dice} />
                </SecondaryButton>

                <PrimaryButton label="Add a todo" onClick={openAddDialog}>
                    <Icon icon={ICONS.add} />
                </PrimaryButton>
            </div>
        </div>

        {#if errorMessage}
            <p class="error" role="alert">{errorMessage}</p>
        {/if}

        {#if sortedTodos.length > 0}
            <TodoList todos={sortedTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={openEditDialog} />
        {:else}
            <div class="nothing-todo non-selectable" in:fade={{ delay: 500 }}>Nothing to do!</div>
        {/if}

        {#if dialogOpen}
            <TodoDialog todo={editedTodo} onSave={saveTodo} onClose={() => (dialogOpen = false)} />
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
                width: 70%;
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

            .error {
                margin: 0 0 12px;
                color: #e57373;
                font-size: 14px;
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
