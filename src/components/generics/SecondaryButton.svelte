<script lang="ts">
  export let onClick: () => any = () => {};
</script>

<button class="secondary-button non-selectable" onclick={ onClick }>
    <span class="not-cover">
        <slot />
    </span>
</button>
