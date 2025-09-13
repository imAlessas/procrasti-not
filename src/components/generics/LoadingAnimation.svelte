<div class="loader"></div>

<style lang="scss">
// https://css-loaders.com/pulsing/

    .loader {
        width: 35px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--text-color);
        box-shadow: 0 0 0 0 var(--text-color);
        animation: pulse 1s infinite;
        backdrop-filter: blur(10px);

        @keyframes pulse {
            100% {box-shadow: 0 0 0 50px #0000}
        }
    }

</style>
