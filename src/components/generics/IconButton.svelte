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
