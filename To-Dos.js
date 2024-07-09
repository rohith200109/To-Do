let listcontainer = document.getElementById("list-container");


function getTodoListFromLocalStorage() 
{
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}
// localStorage.removeItem("todoList");
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

function addToStorage(todoList,) {
 
  localStorage.setItem("todoList", JSON.stringify(todoList));
  
}

function checkBoxClicked(toDoNumber,labelId,toDoLiId) {
  let inputElement = document.getElementById(toDoNumber);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checkedText");
  let index = todoList.findIndex(function (element) {
    let todoId = "list" + element.number;
    if (todoId == toDoLiId) return true;
  });
  if(todoList[index].check===false){
    todoList[index].check=true;
  }
  else{
    todoList[index].check=false;
  }
  

}
function deleteList(toDoLiId) {
  let toDoContainer = document.getElementById(toDoLiId);
  listcontainer.removeChild(toDoContainer);
  let index = todoList.findIndex(function (element) {
    let todoId = "toDoId" + element.number;
    if (todoId == toDoLiId) return true;
  });
  todoList.splice(index, 1);
}
let createTask = function (todo) {

  let toDoNumber = "toDoId" + todo.number;
  let labelId = "label" + todo.number;
  let toDoLiId = "list" + todo.number;

  let list = document.createElement("li");
  list.style.display = "flex";
  list.id = toDoLiId;
  listcontainer.append(list);

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = toDoNumber;
  input.checked = todo.check;
  list.appendChild(input);

  input.onclick = function () {
    checkBoxClicked(toDoNumber,labelId,toDoLiId);
  };

  let listTextContainer = document.createElement("div");
  listTextContainer.style.display = "flex";
  list.appendChild(listTextContainer);

  let label2 = document.createElement("label");
  label2.htmlFor = toDoNumber;
  label2.innerHTML = todo.Text + "&nbsp &nbsp";
  label2.id = labelId;
  listTextContainer.appendChild(label2);
  if (todo.check=== true) {
    label2.classList.add("checkedText");
  }
 

  let deleteContainer = document.createElement("div");
  deleteContainer.style.textAlign = "right";
  listTextContainer.appendChild(deleteContainer);

  let deleteTag = document.createElement("i");
  deleteContainer.appendChild(deleteTag);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteIcon.onclick = function () {
    deleteList(toDoLiId);
  };
  deleteTag.appendChild(deleteIcon);
};
function addTodoTask() {
  let data = document.getElementById("todoText");

  let task = {
    Text: data.value,
    number: ++todosCount,
    check:false,
  };
  todoList.push(task);
  if (task.number != null) {
    createTask(task);
  }
  data.value = "";
}

let addTodo = document.getElementById("add");
addTodo.onclick = function () {
  addTodoTask();
};

let stringArray = localStorage.getItem("todoList");
let arr = JSON.parse(stringArray);
if (arr != null) {
  for (let e of arr) {
    createTask(e);
  }
}

let saveButton = document.getElementById("save");
saveButton.onclick = function () {
  addToStorage(todoList);
};
