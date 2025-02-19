<script lang='ts'>
  import { insertTodo } from "$lib";

  let { addTodoClicked = $bindable(), todo_list = $bindable(), updateTodoList} = $props();

  import {createTodoSchema} from "$lib"


  function addClick() {
    addTodoClicked != addTodoClicked;
  }



  function getTextAreaValue() {
    let textareaElement = document.getElementById("textarea-todo") as HTMLTextAreaElement;

    // Exit modal if necessary
    if (!textareaElement || textareaElement.value === "") {
        addTodoClicked = !addTodoClicked;
        return;
    }

    return textareaElement.value;
  }

  function add() {

    let todoValue = getTextAreaValue();

    if (todoValue)
      todo_list = insertTodo(
        todo_list,
        createTodoSchema(
          todoValue,
          todo_list
        )
      );

    updateTodoList();
    addClick();
  }

</script>



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
    background-color: rgba(0, 0, 0, 0.3); /* Darker background for better contrast */
    backdrop-filter: blur(10px); /* Adds a blur effect to the background */
  }

  .modal-content {
    background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background */
    margin: 10% auto;
    padding: 20px;
    padding-bottom: 3px;
    border-radius: 15px; /* Rounded corners */
    width: 60%; /* Reduced width for a more compact look */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Softer shadow for a modern look */
    animation: fadeIn 0.5s ease-in-out; /* Fade-in animation */
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .close {
    color: #aaa;
    float: right;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .close:hover,
  .close:focus {
    text-decoration: none;
    cursor: pointer;
  }

  .close {
    background: none;
    border: none;
    padding: 10px 10px;
    border-radius: 100%;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .close:hover {
    background: linear-gradient(135deg, rgba(205,0,0, 0.3), #FFFFFF);
    color: white;
    transform: scale(105%);
  }

  .close:active {
    transform: scale(95%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .modal-content h2 {
    font-family: 'Futura', sans-serif;
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
    font-family: 'Futura', sans-serif;
    font-size: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
    resize: none; /* Disable resize controls */
  }

  .modal-content textarea:focus {
    border-color: #87CEEB; /* Light blue border on focus */
    outline: none;
  }

  .add-todo {
    background: linear-gradient(135deg, #FFA500, #ADD8E6);
    margin: 10px auto;
    display: block;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Futura', sans-serif;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease, transform 0.2s ease;
    margin-top: 10px;
  }

  .add-todo:hover {
    background: linear-gradient(135deg, #FF8C00, #87CEEB);
    transform: scale(105%);
  }

  .add-todo:active {
    transform: scale(95%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

</style>


<div class="modal">
    <div class="modal-content">

        <button class="close" onclick={() => addClick()}>❌</button>

        <h2>Add your todo</h2>

        <textarea placeholder="Enter new todo" id="textarea-todo"></textarea>
            
        <button class="add-todo" onclick={() => add() }>Add</button>

    </div>
</div>
