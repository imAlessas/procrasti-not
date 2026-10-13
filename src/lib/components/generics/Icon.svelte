<script lang="ts">
    import Icon from "@iconify/svelte";

    let { icon }: { icon: string } = $props();
</script>

<div class="iconify" aria-hidden="true">
    <Icon {icon} width="20" height="20" />
</div>
