import factoryService from './factories';
const createLocalProject = (projectName) => {
  const newProject = factoryService.projectFactory(projectName);

  window.localStorage.setItem(projectName, JSON.stringify(newProject));
};

const createLocalTodo = (todo) => {
  const newTodo = factoryService.todoFactory(
    todo.todoName,
    todo.description,
    todo.todoDate,
    todo.priority,
    todo.projectName
  );
  let project = JSON.parse(localStorage.getItem(todo.projectName));
  project.todos.push(newTodo);
  localStorage.setItem(todo.projectName, JSON.stringify(project));
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
    toggleModals();
    createNewTodo();
  });
};
const setTodoEventListener = () => {
  const todoButton = domCollection.todoButton;
  todoButton.addEventListener('click', () => {
    toggleModals('todo');
  });
};

export default {
  createLocalProject,
  createLocalTodo,
  createNewTodo,
  submitNewTodo,
  setTodoEventListener,
};
