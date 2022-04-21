import factoryService from './factories';
import { isToday, differenceInCalendarWeeks, parseISO } from 'date-fns';
import domHelpers from './domHelpers';
import domCollection from './domCollection';
const createLocalProject = (projectName) => {
  const newProject = factoryService.projectFactory(projectName);

  window.localStorage.setItem(projectName, JSON.stringify(newProject));
};

const addDatedTodo = (todo) => {
  const dueDate = parseISO(todo.dueDate);
  const today = JSON.parse(localStorage.getItem('Today'));
  if (domHelpers.isDueThisWeek(todo)) {
    const week = JSON.parse(localStorage.getItem('Week'));
    today.todos.push(todo);
    week.todos.push(todo);
    localStorage.setItem('Today', JSON.stringify(today));
    localStorage.setItem('Week', JSON.stringify(week));
  } else if (isToday(dueDate)) {
    today.todos.push(todo);
    localStorage.setItem('Today', JSON.stringify(today));
  }
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
  addDatedTodo(newTodo);
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

const removeLocalProject = (projectKey) => {
  localStorage.removeItem(projectKey);
};

export default {
  createLocalProject,
  createLocalTodo,
  createNewTodo,
  submitNewTodo,
  setTodoEventListener,
  removeLocalProject,
};
