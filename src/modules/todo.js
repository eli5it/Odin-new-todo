import domHelpers from './domHelpers';
import logic from './logic';
import domCollection from './domCollection';

const deleteTodo = (todo) => {
  const [projectName, todoName] = todo.id.split('-');
  const currentProject = JSON.parse(localStorage.getItem(projectName));
  currentProject.todos = currentProject.todos.filter(
    (todo) => todo.title !== todoName
  );
  localStorage.setItem(projectName, JSON.stringify(currentProject));
  todo.remove();
};

const addDomTodo = (todoName, projectName) => {
  const container = domCollection.currentTodos;
  const newTodoItem = document.createElement('div');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', () => {
    deleteTodo(newTodoItem);
  });
  deleteButton.innerText = 'delete';
  deleteButton.className = 'delete-todo-button';
  checkbox.type = 'checkbox';
  checkbox.id = todoName;
  checkbox.name = todoName;
  span.innerText = todoName;
  newTodoItem.className = 'new-todo-item';
  newTodoItem.id = `${projectName}-${todoName}`;
  newTodoItem.append(checkbox, span, deleteButton);
  container.appendChild(newTodoItem);
};

const renderNewTodo = (todo) => {
  const currentProject = domCollection.currentProject;
  if (currentProject.innerText === todo.projectName) {
    addDomTodo(todo.todoName, todo.projectName);
  }
};

const renderTodos = () => {
  const mainJson = localStorage.getItem('Main');
  // converts returned JSON into array of todos
  const todoArray = JSON.parse(mainJson).todos;

  if (todoArray) {
    todoArray.forEach((todo) => {
      addDomTodo(todo.title, 'Main');
    });
  }
};

const createNewTodo = () => {
  const todoProperties = domCollection.todoFormContents;
  const newTodo = {};
  for (let key in todoProperties) {
    newTodo[key] = todoProperties[key].value;
  }
  logic.createLocalTodo(newTodo);
  renderNewTodo(newTodo);
};

const submitNewTodo = () => {
  const formButton = domCollection.todoFormButton;

  formButton.addEventListener('click', (event) => {
    event.preventDefault();
    domHelpers.toggleModals();
    createNewTodo();
  });
};
const setTodoEventListener = () => {
  const todoButton = domCollection.todoButton;
  todoButton.addEventListener('click', () => {
    domHelpers.toggleModals('todo');
  });
};
export default {
  deleteTodo,
  addDomTodo,
  renderNewTodo,
  renderTodos,
  createNewTodo,
  submitNewTodo,
  setTodoEventListener,
};
