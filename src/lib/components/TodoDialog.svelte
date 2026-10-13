<script lang="ts">
    import { onMount } from "svelte";
    import ActionButton from "./generics/ActionButton.svelte";
    import IconButton from "./generics/IconButton.svelte";
    import LoadingAnimation from "./generics/PulsingAnimation.svelte";
    import { api } from "$lib/utils/api";
    import { ICONS } from "$lib/utils/const";
    import { getRandomTodo } from "$lib/utils/todo";
    import type { TodoDTO } from "$lib/types";

    const MAX_LENGTH = 500;

    let {
        todo,
        onSave,
        onClose,
    }: {
        todo?: TodoDTO;
        onSave: (text: string) => Promise<void>;
        onClose: () => void;
    } = $props();

    // The dialog is re-created for every todo, so initial values are intentionally captured once
    // svelte-ignore state_referenced_locally
    const editMode = todo !== undefined;

    // svelte-ignore state_referenced_locally
    let text = $state(todo?.text ?? "");
    let placeholder = $state("");
    let thinking = $state(false);
    let saving = $state(false);
    let errorMessage = $state("");
    let textArea: HTMLTextAreaElement;

    async function generate(): Promise<void> {
        if (!text.trim() || thinking) return;

        thinking = true;
        errorMessage = "";

        try {
            const response = await api<{ enhanced: string }>("POST", "/api/gemini", { text });
            if (response.enhanced) text = response.enhanced.slice(0, MAX_LENGTH);
        } catch (error) {
            errorMessage = (error as Error).message;
        } finally {
            thinking = false;
            textArea?.focus();
        }
    }

    async function save(): Promise<void> {
        if (saving) return;

        if (!text.trim()) {
            onClose();
            return;
        }

        saving = true;
        errorMessage = "";

        try {
            await onSave(text.trim());
        } catch (error) {
            errorMessage = (error as Error).message;
            saving = false;
        }
    }

    function onKeydown(event: KeyboardEvent): void {
        if (event.key === "Escape") onClose();
        else if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) save();
    }

    onMount(async () => {
        textArea.focus();
        if (!editMode) placeholder = await getRandomTodo();
    });
</script>

<svelte:window onkeydown={onKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
    class="dialog"
    onclick={(event) => {
        if (event.target === event.currentTarget) onClose();
    }}
>
    <div class="dialog-content" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        {#if thinking}
            <div class="loading">
                <LoadingAnimation />
            </div>
        {/if}

        <div class="header">
            <h2 id="dialog-title">{editMode ? "Edit" : "Add"} your todo</h2>

            <div class="close">
                <ActionButton icon={ICONS.close} label="Close" onClick={onClose} type="delete" />
            </div>
        </div>

        <textarea
            {placeholder}
            aria-label="Todo text"
            maxlength={MAX_LENGTH}
            class:blur={thinking}
            bind:value={text}
            bind:this={textArea}
        ></textarea>

        {#if errorMessage}
            <p class="error" role="alert">{errorMessage}</p>
        {/if}

        <div class="footer">
            <ActionButton
                type="ai"
                label="Fix typos with AI"
                icon={ICONS.sparkle}
                disabled={thinking || !text.trim()}
                onClick={generate}
            />

            <IconButton
                onClick={save}
                disabled={saving || thinking}
                text={editMode ? "Confirm" : "Add"}
                icon={editMode ? ICONS.pencil_confirm : ICONS.add}
            />
        </div>
    </div>
</div>

<style lang="scss">
    .dialog {
        display: block;
        position: fixed;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;

        .dialog-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 50vh;
            max-width: 400px;
            width: 90%;
            margin: 10% auto;
            padding: 20px 16px 16px 16px;
            border-radius: 15px;
            background-color: var(--bkg-base);
            box-shadow: var(--container-box-shadow);
            animation: fadeIn 0.5s ease-in-out;

            @media (max-width: 670px) {
                width: 80%;
                height: 50%;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .loading {
                position: absolute;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1;

                @media (max-width: 800px) {
                    top: 40%;
                }

                @media (max-width: 450px) {
                    top: 35%;
                }
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;

                h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
            }

            textarea {
                flex-grow: 1;
                flex-shrink: 1;
                min-height: 0;
                width: calc(100% - 25px);
                resize: none;
                padding: 10px;
                border-radius: 10px;
                border: none;
                font-family: var(--font-family);
                font-size: var(--font-size);
                color: var(--text-color);
                background-color: var(--bkg-base);
                transition: border-color 0.3s ease;
                overflow-y: auto;

                &.blur {
                    filter: blur(4px);
                    pointer-events: none;
                    user-select: none;
                    transition: filter 0.3s ease;
                }

                &:focus {
                    outline: none;
                }
            }

            .error {
                margin: 8px 0 0;
                color: #e57373;
                font-size: 14px;
            }

            .footer {
                display: flex;
                margin-top: 12px;
                justify-content: space-between;
            }
        }
    }
</style>
