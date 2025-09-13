<script lang="ts">
    import Icon from "./Icon.svelte";
    
    export let icon;
    export let onClick: () => any = () => {};
    export let type : "complete" | "delete" | "ai";

</script>



<button class="action-button {type} non-selectable " on:click|stopPropagation={onClick}>
    <Icon {icon} />
</button>



<style class="scss">
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

        &:hover {
            transform: scale(105%);
        }

        &:active {
            transform: scale(95%);
            box-shadow: var(--btn-active-box-shadow);
        }

        &.complete {
            border-radius: 100%;

            &:hover {
                background: var(--btn-complete-gradient);
            }
        }

        &.delete {
            border-radius: 10px;

            &:hover {
                background: var(--btn-delete-gradient);
            }
        }

        &.ai {
            border-radius: 100%;

            &:hover {
                background: var(--btn-ai-gradient);
            }
        }

    }
</style>
