<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        onClick = () => {},
        label,
        disabled = false,
        children,
    }: {
        onClick?: () => unknown;
        label?: string;
        disabled?: boolean;
        children: Snippet;
    } = $props();
</script>

<button
    class="secondary-button non-selectable"
    type="button"
    aria-label={label}
    title={label}
    {disabled}
    onclick={onClick}
>
    <span class="not-cover">
        {@render children()}
    </span>
</button>

<style lang="scss">
    .secondary-button {
        position: relative;
        background: var(--btn-gradient);
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-family: 'Futura', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: var(--btn-box-shadow);
        transition: transform 0.2s ease;

        &::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            right: 3px;
            bottom: 3px;
            background: var(--bkg-base);
            border-radius: 8px; // Slightly smaller than the button
            z-index: 1;
            transition: opacity 0.3s ease;
        }

        &:hover:not(:disabled) {
            transform: scale(105%);

            &::after {
                opacity: 0;
            }
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

        .not-cover {
            z-index: 2;
            position: relative;
        }
    }
</style>
