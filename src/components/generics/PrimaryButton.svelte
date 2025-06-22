<script lang="ts">
  export let onClick: () => any = () => {};
</script>

<button class="primary-button non-selectable" onclick={onClick}>
    <slot />
</button>
