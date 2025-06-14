<script lang="ts">
    import {
        insertTodo,
        createTodoSchema,
    } from "$lib/utils";


    export let todoList: DatabaseTodo[];
    export let showModal: (value: boolean) => void;
    export let updateTodoList: (list: DatabaseTodo[]) => void;



    function getTextAreaValue() : string | undefined {
        let textareaElement = document.getElementById("textarea-todo") as HTMLTextAreaElement;

        if (!textareaElement || textareaElement.value === "") {
            showModal(false);
            return undefined;
        }

        return textareaElement.value;
    }


    
    function add() : void {
        let todoValue = getTextAreaValue();

        // Exit modal if undefined
        if (todoValue === undefined)
            return;
    
        todoList = insertTodo(
            todoList,
            createTodoSchema(todoValue, todoList)
        );

        updateTodoList(todoList);
        showModal(false);
    }
</script>





<div class="modal">
    <div class="modal-content">
        <button class="close" onclick={() => showModal(false)}>❌</button>

        <h2>Add your todo</h2>

        <textarea placeholder="Enter new todo" id="textarea-todo"></textarea>

        <button class="add-todo" onclick={() => add()}>Add</button>
    </div>
</div>





<style>
    .modal {
        display: block;
        position: fixed;
        z-index: 3;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
    }

    .modal-content {
        background-color: rgba(255, 255, 255, 0.8);
        margin: 10% auto;
        padding: 20px;
        padding-bottom: 3px;
        border-radius: 15px;
        width: 60%;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .close {
        color: #aaa;
        float: right;
        font-weight: bold;
        transition: color 0.3s ease;
        background: none;
        border: none;
        padding: 10px 10px;
        border-radius: 100%;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
    }

    .close:hover {
        background: linear-gradient(135deg, rgba(205, 0, 0, 0.3), #ffffff);
        color: white;
        transform: scale(105%);
    }

    .close:active {
        transform: scale(95%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .modal-content h2 {
        font-family: "Futura", sans-serif;
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
    }

    .modal-content textarea {
        width: calc(100% - 20px);
        height: 100px;
        margin-top: 10px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        font-family: "Futura", sans-serif;
        font-size: 16px;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s ease;
        resize: none;
    }

    .modal-content textarea:focus {
        border-color: #87ceeb;
        outline: none;
    }

    .add-todo {
        background: linear-gradient(135deg, #ffa500, #add8e6);
        margin: 10px auto;
        display: block;
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-family: "Futura", sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background 0.3s ease, transform 0.2s ease;
        margin-top: 10px;
    }

    .add-todo:hover {
        background: linear-gradient(135deg, #ff8c00, #87ceeb);
        transform: scale(105%);
    }

    .add-todo:active {
        transform: scale(95%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>
