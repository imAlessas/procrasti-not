<style lang="scss">
   @use '$lib/styles/style.scss' as *;
</style>

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





<div class="modal">
    <div class="modal-content">

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


