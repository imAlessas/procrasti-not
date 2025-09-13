<script lang="ts">
    export let onClick: () => any = () => {};
</script>



<button class="primary-button non-selectable" on:click|stopPropagation={onClick}>
    <slot />
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
        
        &:hover {
            background: var(--btn-hover-gradient);
            transform: scale(105%);
        }
        
        &:active {
            transform: scale(95%);
            box-shadow: var(--btn-active-box-shadow);
        }
    }
</style>
