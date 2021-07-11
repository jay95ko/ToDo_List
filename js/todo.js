const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "toDos"

let toDos = []

function saveToDo(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
    saveToDo();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "🍊";
    li.appendChild(span);
    li.appendChild(button);
    button.addEventListener("click", deleteToDo)
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    const newTodoOBJ = {
        text:newTodo,
        id: Date.now(),
    }
    toDoInput.value="";
    toDos.push(newTodoOBJ);
    paintToDo(newTodoOBJ);
    saveToDo(toDos);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const loadToDo = localStorage.getItem(TODOS_KEY);

const parseloadToDo = JSON.parse(loadToDo);
if (parseloadToDo !== null){
    toDos = parseloadToDo;
    parseloadToDo.forEach(paintToDo);
}