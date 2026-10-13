<script lang="ts">
    import { ICONS } from "$lib/utils/const";
    import ActionButton from "./generics/ActionButton.svelte";
    import type { TodoDTO } from "$lib/types";

    let {
        todo,
        onToggle,
        onDelete,
        onEdit,
    }: {
        todo: TodoDTO;
        onToggle: (todo: TodoDTO) => void;
        onDelete: (todo: TodoDTO) => void;
        onEdit: (todo: TodoDTO) => void;
    } = $props();
</script>

<li class="todo-item" class:completed={todo.isDone}>
    <div class="todo-body">
        <ActionButton
            type="complete"
            icon={ICONS.check}
            label={todo.isDone ? "Mark as not completed" : "Mark as completed"}
            onClick={() => onToggle(todo)}
        />

        <button class="todo-text" type="button" disabled={todo.isDone} onclick={() => onEdit(todo)} title={todo.text}>
            {todo.text}
        </button>
    </div>

    <ActionButton type="delete" icon={ICONS.bin} label="Delete todo" onClick={() => onDelete(todo)} />
</li>

<style lang="scss">
    .todo-item {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        &.completed .todo-text {
            text-decoration: line-through;
            color: #999;
        }

        .todo-body {
            display: flex;
            align-items: center;
            flex: 1;
            min-width: 0;
            padding: 10px;
            border-radius: 10px;
            background-color: var(--bkg-todo-item);
            transition: background-color 0.5s ease;

            &:hover {
                background-color: var(--bkg-todo-list);
            }
        }

        .todo-text {
            all: unset;
            flex: 1;
            min-width: 0;
            box-sizing: border-box;
            cursor: pointer;
            text-align: left;
            padding: 0 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: inherit;

            &:disabled {
                cursor: default;
            }

            &:focus-visible {
                outline: 2px solid var(--text-color);
                outline-offset: 2px;
            }
        }
    }
</style>
