<script lang="ts">
    import Icon from "./Icon.svelte";
    
    export let icon;
    export let onClick: () => any = () => {};
    export let type : "complete" | "delete";

</script>


<button class="action-button {type} non-selectable " onclick={onClick}>
    <Icon {icon} />
</button>
