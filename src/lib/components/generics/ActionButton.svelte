<script lang="ts">
    import Icon from "./Icon.svelte";

    let {
        icon,
        label,
        type,
        onClick = () => {},
        disabled = false,
    }: {
        icon: string;
        label: string;
        type: "complete" | "delete" | "ai";
        onClick?: () => unknown;
        disabled?: boolean;
    } = $props();
</script>

<button
    class="action-button {type} non-selectable"
    type="button"
    aria-label={label}
    title={label}
    {disabled}
    onclick={onClick}
>
    <Icon {icon} />
</button>

<style lang="scss">
    .action-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 10px;
        cursor: pointer;
        box-shadow: var(--btn-box-shadow);
        transition: transform 0.2s ease;
        color: white;
        font-size: 14px;
        font-weight: bold;
        flex-shrink: 0;

        &:hover:not(:disabled) {
            transform: scale(105%);
        }

        &:active:not(:disabled) {
            transform: scale(95%);
            box-shadow: var(--btn-active-box-shadow);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &:focus-visible {
            outline: 2px solid var(--text-color);
            outline-offset: 2px;
        }

        &.complete {
            border-radius: 100%;

            &:hover:not(:disabled) {
                background: var(--btn-complete-gradient);
            }
        }

        &.delete {
            border-radius: 10px;

            &:hover:not(:disabled) {
                background: var(--btn-delete-gradient);
            }
        }

        &.ai {
            border-radius: 100%;

            &:hover:not(:disabled) {
                background: var(--btn-ai-gradient);
            }
        }
    }
</style>
