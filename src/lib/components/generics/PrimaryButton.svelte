<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        onClick = () => {},
        type = "button",
        label,
        disabled = false,
        children,
    }: {
        onClick?: () => unknown;
        type?: "button" | "submit";
        label?: string;
        disabled?: boolean;
        children: Snippet;
    } = $props();
</script>

<button class="primary-button non-selectable" {type} aria-label={label} {disabled} onclick={onClick}>
    {@render children()}
</button>

<style lang="scss">
    .primary-button {
        background: var(--btn-gradient);
        border: none;
        color: var(--text-color);
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-family: var(--font-family);
        font-size: 16px;
        font-weight: bold;
        box-shadow: var(--btn-box-shadow);
        transition: background 0.3s ease, transform 0.2s ease;

        &:hover:not(:disabled) {
            background: var(--btn-hover-gradient);
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
    }
</style>
