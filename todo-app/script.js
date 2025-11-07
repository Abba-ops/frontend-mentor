const todoAppInput = document.querySelector(".todo-app__input");
const todoCount = document.querySelector(".todo-footer__count");
const themeToggle = document.querySelector(".todo-app__theme-toggle");
const todoClear = document.querySelector(".todo-footer__clear");
const todoList = document.querySelector(".todo-list");

const THEME_KEY = "todo-app-theme";
const TODOS_KEY = "todo-app-todos";

let draggedItem = null;
let todos = [];

(function () {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
    themeToggle.src =
      savedTheme === "light" ? "images/icon-moon.svg" : "images/icon-sun.svg";
  }
})();

(function () {
  const savedTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
  if (savedTodos) todos = savedTodos;
  todos.forEach((todo) => createNewTodo(todo));
})();

function isTodoListEmpty() {
  const todoListEmpty = document.querySelector(".todo-list__empty");
  todoListEmpty.style.display = todos.length ? "none" : "block";
}

function createNewTodo(newItem) {
  const todoItemElement = document.createElement("div");
  todoItemElement.className = `todo-list__item ${
    newItem.completed ? "done" : ""
  }`;
  todoItemElement.draggable = true;
  todoItemElement.dataset.completed = newItem.completed;
  todoItemElement.dataset.id = newItem.id;
  todoItemElement.innerHTML = `
  <span class="todo-item__check"></span>
  <span>${newItem.text}</span>
  <img src="images/icon-cross.svg" class="todo__delete" alt="" />
  `;
  todoList.append(todoItemElement);
  todoCount.textContent = `${
    todos.filter((todo) => !todo.completed).length
  } items left`;
  isTodoListEmpty();
}

function updateTodosOrder() {
  const items = Array.from(todoList.querySelectorAll(".todo-list__item"));

  const newOrder = items.map((item) => {
    const id = item.dataset.id;
    return todos.find((todo) => todo.id === id);
  });

  todos = newOrder;
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function filterListItems(event) {
  const todoItems = todoList.querySelectorAll(".todo-list__item");
  const filter = event.target.textContent.trim();

  document
    .querySelectorAll(".todo-filters__item")
    .forEach((item) => item.classList.remove("active"));
  event.target.classList.add("active");

  todoItems.forEach((todoItem) => {
    switch (filter) {
      case "All":
        todoItem.style.display = "flex";
        break;
      case "Active":
        todoItem.style.display =
          todoItem.dataset.completed === "true" ? "none" : "flex";
        break;
      case "Completed":
        todoItem.style.display =
          todoItem.dataset.completed === "true" ? "flex" : "none";
        break;
      default:
        todoItem.style.display = "flex";
    }
  });
}

function clearCompletedHandler() {
  const todoItems = todoList.querySelectorAll(".todo-list__item");
  todos = todos.filter((todo) => !todo.completed);
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  todoItems.forEach((todoItem) => {
    if (todoItem.dataset.completed === "true") {
      todoItem.remove();
    }
  });
}

function addTodoHandler(event) {
  if (!(event.key === "Enter")) return;

  const userInput = event.target.value.trim();
  if (!userInput) return;

  const newTodoItem = {
    text: userInput,
    id: crypto.randomUUID(),
    completed: false,
  };

  event.target.value = "";
  todos.push(newTodoItem);
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  createNewTodo(newTodoItem);
}

function toggleThemeHandler() {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = newTheme;
  this.src =
    currentTheme === "light" ? "images/icon-sun.svg" : "images/icon-moon.svg";
  localStorage.setItem(THEME_KEY, newTheme);
}

themeToggle.addEventListener("click", toggleThemeHandler);
todoClear.addEventListener("click", clearCompletedHandler);
todoAppInput.addEventListener("keydown", addTodoHandler);
todoList.addEventListener("click", (event) => {
  const todoItemElement = event.target.closest(".todo-list__item");
  const todoId = todoItemElement.dataset.id;

  if (event.target.classList.contains("todo-item__check")) {
    todoItemElement.classList.toggle("done");
    todos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }

  if (event.target.classList.contains("todo__delete")) {
    todoItemElement.remove();
    todos = todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    isTodoListEmpty();
  }

  todoCount.textContent = `${
    todos.filter((todo) => !todo.completed).length
  } items left`;
});

todoList.addEventListener("dragstart", (event) => {
  if (event.target.classList.contains("todo-list__item")) {
    draggedItem = event.target;
    event.dataTransfer.effectAllowed = "move";
  }
});

todoList.addEventListener("dragover", (event) => {
  event.preventDefault();
  const target = event.target.closest(".todo-list__item");

  if (!target || target === draggedItem) return;
  const bounding = target.getBoundingClientRect();

  const offset = event.clientY - bounding.top;

  if (offset > bounding.height / 2) {
    todoList.insertBefore(draggedItem, target.nextSibling);
  } else {
    todoList.insertBefore(draggedItem, target);
  }
});

todoList.addEventListener("dragend", (event) => {
  if (draggedItem) {
    draggedItem = null;
    updateTodosOrder();
  }
});
