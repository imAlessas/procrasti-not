<script lang="ts">
    import { insertTodo, getRandomTodo } from "$lib/utils/todo";
    import { onMount } from "svelte";
    import ActionButton from "./generics/ActionButton.svelte";
    import IconButton from "./generics/IconButton.svelte";
    import { ICONS } from "$lib/utils/const";
    import LoadingAnimation from "./generics/LoadingAnimation.svelte";
    import type { DatabaseTodo, DatabaseUser } from "$lib/database/interfaces";
    

    export let loggedUser: DatabaseUser;
    export let todoList: DatabaseTodo[];
    export let todo: DatabaseTodo | undefined = undefined;
    export let showDialog: (value: boolean) => void;
    export let updateTodoList: (list: DatabaseTodo[]) => void;
    export let editMode: boolean;

    let randomPlaceholder: string = "";
    let textAreaElement: HTMLTextAreaElement;
    let thinking = false;

    function getTextAreaValue() : string | undefined {
        let textareaElement = document.getElementById("textarea-todo") as HTMLTextAreaElement;
        return textareaElement.value;
    }

    function setTextAreaValue(text : string) : void {
        let textareaElement = document.getElementById("textarea-todo") as HTMLTextAreaElement;
        textareaElement.value = text
    }


    async function generate() : Promise<void> {

        thinking = true;

        const response = await fetch(`/api/gemini`, {
            method: 'POST',
            body:JSON.stringify({
                text: getTextAreaValue()
            })
        })

        const enhanced = (await response.json()).enhanced;
        thinking = false;
        
        if (!enhanced)
            return;

        setTextAreaValue(enhanced);
        textAreaElement.focus();

    }


    
    async function add() : Promise<void> {
        let text = getTextAreaValue();
        if (text === undefined || text === '') {
            showDialog(false);
            return;
        }
    
        const response = await fetch(`/api/todos/create`, {
            method: 'POST',
            body:JSON.stringify({
                text: text,
                _idUser: loggedUser._id
            })
        });

        updateTodoList( insertTodo( todoList, await response.json()) );
        showDialog(false);
    }

        
    async function edit() : Promise<void> {
        if (!todo)
            return;

        let text = getTextAreaValue();
        if (text === undefined || text === '') {
            showDialog(false);
            return;
        }
    
        await fetch(`/api/todos/edit`, {
            method: 'PUT',
            body:JSON.stringify({
                text: text,
                todoID: todo._id.toString(),
            })
        });

        todo.text = text;
        updateTodoList( todoList );
        showDialog(false);
    }


    onMount( async () => {
        if (editMode)
            setTextAreaValue( todo?.text ?? "" );
        else 
            randomPlaceholder = await getRandomTodo();
        
        textAreaElement.focus();
    });

</script>



<div class="dialog">
    <div class="dialog-content">

        {#if thinking}
            <div class="loading">
                <LoadingAnimation />
            </div>
        {/if}

        <div class="header">
            <h2> {editMode ? "Edit" : "Add"} your todo</h2>
            
            <div class="close">
                <ActionButton icon={ICONS.close} onClick={() => showDialog(false)} type="delete"/>
            </div>
        </div>

        <textarea placeholder={randomPlaceholder} id="textarea-todo" class={thinking ? "blur" : ""} bind:this={textAreaElement}></textarea>
 
        <div class="footer">
            <ActionButton type="ai" onClick={() => generate()} icon={ICONS.sparkle}/>

            {#if editMode}
                <IconButton onClick={() => edit()} text="Edit" icon={ICONS.pencil}/>
            {:else}
                <IconButton onClick={() => add()} text="Add" icon={ICONS.add}/>
            {/if}

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

            .footer {
                display: flex;
                margin-top: 12px;
                justify-content: space-between;

            }


        }
    }
</style>
