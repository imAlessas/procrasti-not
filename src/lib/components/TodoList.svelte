<script lang="ts">
    import TodoItem from "./TodoItem.svelte";
    import type { TodoDTO } from "$lib/types";

    let {
        todos,
        onToggle,
        onDelete,
        onEdit,
    }: {
        todos: TodoDTO[];
        onToggle: (todo: TodoDTO) => void;
        onDelete: (todo: TodoDTO) => void;
        onEdit: (todo: TodoDTO) => void;
    } = $props();
</script>

<ul class="todo-list">
    {#each todos as todo (todo.id)}
        <TodoItem {todo} {onToggle} {onDelete} {onEdit} />
    {/each}
</ul>

<style lang="scss">
    .todo-list {
        list-style-type: none;
        padding: 0;
    }
</style>
