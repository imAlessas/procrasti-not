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

        <div class="header">
            <h2>Add your todo</h2>
            
            <div class="close">
                <ActionButton icon={ICONS["close"]} onClick={() => showDialog(false)} type="delete"/>
            </div>
        </div>

        <textarea placeholder={randomPlaceholder} id="textarea-todo" bind:this={textAreaElement}></textarea>

        <div class="add-button">
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

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                
                .close {
                    float: right;
                }
                
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
            }

            textarea:focus {
                outline: none;
            }

            .add-button {
                margin-top: 12px;
                align-self: flex-end;      
            }
        }
    }
</style>
