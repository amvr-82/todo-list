var todoInput = document.getElementById("todo-input");
var addButton = document.getElementById("add-btn");
var todoList = document.getElementById("todo-list");

window.onload = function () {
  var savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    JSON.parse(savedTodos).forEach(function (todo) {
      createTodoItem(todo.text, todo.done);
    });
  }
};

function saveTodos() {
  var todosArray = [];
  document.querySelectorAll("li").forEach(function (todoElement) {
    todosArray.push({
      text: todoElement.children[0].innerText,
      done: todoElement.classList.contains("done"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function createTodoItem(text, isDone) {
  var listItem = document.createElement("li");
  var textSpan = document.createElement("span");
  textSpan.innerText = text;
  listItem.appendChild(textSpan);

  var deleteButton = document.createElement("button");
  deleteButton.innerText = "*";
  deleteButton.onclick = function () {
    listItem.remove();
    saveTodos();
  };
  listItem.appendChild(deleteButton);

  listItem.onclick = function () {
    listItem.classList.toggle("done");
    saveTodos();
  };

  if (isDone) listItem.classList.add("done");
  todoList.appendChild(listItem);
  saveTodos();
}

addButton.onclick = function () {
  if (todoInput.value.trim() != "") {
    createTodoItem(todoInput.value);
    todoInput.value = "";
  }
};

todoInput.onkeypress = function (e) {
  if (e.key == "Enter") addButton.onclick();
};
