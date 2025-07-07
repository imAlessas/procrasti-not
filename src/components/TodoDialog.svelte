<script lang="ts">
    import type { DatabaseTodo, DatabaseUser } from "$lib/database/interfaces";
    import { insertTodo, getRandomTodo } from "$lib/utils/todo";
    import { onMount } from "svelte";
    import ActionButton from "./generics/ActionButton.svelte";
    import IconButton from "./generics/IconButton.svelte";
    import { ICONS } from "$lib/utils/const";


    export let loggedUser: DatabaseUser;
    export let todoList: DatabaseTodo[];
    export let showDialog: (value: boolean) => void;
    export let updateTodoList: (list: DatabaseTodo[]) => void;

    let randomPlaceholder: string = "";
    let textAreaElement: HTMLTextAreaElement;

    function getTextAreaValue() : string | undefined {
        let textareaElement = document.getElementById("textarea-todo") as HTMLTextAreaElement;

        if (!textareaElement || textareaElement.value === "") {
            showDialog(false);
            return undefined;
        }

        return textareaElement.value;
    }



    
    async function add() : Promise<void> {
        let text = getTextAreaValue();
        if (text === undefined)
            return;
    
        const response = await fetch(`/api/todos/1`, {
            method: 'POST',
            body:JSON.stringify({
                text: text,
                _idUser: loggedUser._id
            })
        });

        updateTodoList(
            insertTodo( todoList, await response.json())
        );
        showDialog(false);
    }

    onMount( async () => {
        randomPlaceholder = await getRandomTodo();
        textAreaElement.focus();
    });

</script>



<div class="dialog">
    <div class="dialog-content">

        <div class="close">
            <ActionButton icon={ICONS["close"]} onClick={() => showDialog(false)} type="delete"/>
        </div>

        <h2>Add your todo</h2>

        <textarea placeholder={randomPlaceholder} id="textarea-todo" bind:this={textAreaElement}></textarea>

        <div style="width:100%; text-align:right; bottom: 1%">
            <IconButton onClick={() => add()} text="Add" icon={ICONS["add"]}/>
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
        justify-content: center;

        .dialog-content {
            background-color: var(--bkg-base);
            margin: 10% auto;
            padding: 20px;
            padding-bottom: 3px;
            border-radius: 15px;
            width: 50%;
            height: 50%;
            box-shadow: var(--container-box-shadow);
            animation: fadeIn 0.5s ease-in-out;

            .close {
                float: right;
            }

            h2 {
                font-size: 24px;
                margin-bottom: 20px;
            }

            textarea {
                color: var(--text-color);
                width: calc(100% - 20px);
                background-color: var(--bkg-base);
                font-family: var(--font-family);
                font-size: var(--font-size);
                border: 0px;
                resize: none;
                height: 60%;
                margin-top: 10px;
                padding: 10px;
                border-radius: 10px;
                transition: border-color 0.3s ease;
            }

            textarea:focus {
                outline: none;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        }
    }
</style>
