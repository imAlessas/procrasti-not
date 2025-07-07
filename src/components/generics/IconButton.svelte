<script lang="ts">
    import Icon from "./Icon.svelte";
    import PrimaryButton from "./PrimaryButton.svelte";

    export let icon;
    export let text = "";
    export let onClick: () => any = () => {};

</script>



<PrimaryButton {onClick}>
    <div class="icon-button {text.length > 0 ? "gap" : ""}">
        <div class="icon-container">
            <Icon {icon} />
        </div>
        
        <span class="button-text">
            {text}
        </span>
        
    </div>
</PrimaryButton>



<style lang="scss">
    .icon-button {
        display: flex;
        align-items: center;

        
        &.gap {
            gap: 8px;
        }

        .icon-container {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
    }
</style>
