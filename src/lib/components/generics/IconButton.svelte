<script lang="ts">
    import Icon from "./Icon.svelte";
    import PrimaryButton from "./PrimaryButton.svelte";

    let {
        icon,
        text = "",
        label,
        type = "button",
        onClick = () => {},
        disabled = false,
    }: {
        icon: string;
        text?: string;
        label?: string;
        type?: "button" | "submit";
        onClick?: () => unknown;
        disabled?: boolean;
    } = $props();
</script>

<PrimaryButton {onClick} {type} {disabled} label={label ?? text}>
    <div class="icon-button" class:gap={text.length > 0}>
        <div class="icon-container">
            <Icon {icon} />
        </div>

        {#if text}
            <span class="button-text">{text}</span>
        {/if}
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
        }
    }
</style>
