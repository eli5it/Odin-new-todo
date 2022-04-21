import domHelpers from './domHelpers';
import logic from './logic';
import domCollection from './domCollection';

const deleteDatedTodo = (todo, todoName) => {
  const todayProject = JSON.parse(localStorage.getItem('Today'));
  const weekProject = JSON.parse(localStorage.getItem('Week'));
  todayProject.todos = todayProject.todos.filter((todo) => {
    todo.title !== todoName && todo.name !== todoName;
  });
  weekProject.todos = weekProject.todos.filter((todo) => {
    todo.title !== todoName && todo.name !== todoName;
  });
  localStorage.setItem('Week', JSON.stringify(weekProject));
  localStorage.setItem('Today', JSON.stringify(todayProject));
};

const deleteTodo = (todo) => {
  const [projectName, todoName] = todo.id.split('-');
  const currentProject = JSON.parse(localStorage.getItem(projectName));
  currentProject.todos = currentProject.todos.filter(
    (todo) => todo.title !== todoName
  );
  localStorage.setItem(projectName, JSON.stringify(currentProject));
  todo.remove();
  deleteDatedTodo(todo, todoName);
};

const createIconElement = (source, name) => {
  const icon = document.createElement('span');
  icon.classList.add('todo-icon');
  icon.classList.add(source);
  icon.innerText = name;
  return icon;
};

const addDomTodo = (todoName, projectName) => {
  const container = domCollection.currentTodos;
  const innerRightContainer = document.createElement('div');
  const newTodoItem = document.createElement('div');
  const span = document.createElement('span');
  const deleteIcon = createIconElement(
    'material-icons-outlined',
    'delete_forever'
  );
  const editIcon = createIconElement('material-icons-outlined', 'edit');
  const flagIcon = createIconElement('material-icons-outlined', 'flag');
  const moveProjectIcon = createIconElement(
    'material-icons-outlined',
    'drive_file_move'
  );
  deleteIcon.addEventListener('click', () => {
    deleteTodo(newTodoItem);
  });
  deleteIcon.classList.add = 'delete-todo-button';
  span.innerText = todoName;
  newTodoItem.className = 'new-todo-item';
  newTodoItem.id = `${projectName}-${todoName}`;
  newTodoItem.className = 'todo-item';
  innerRightContainer.append(editIcon, flagIcon, moveProjectIcon, deleteIcon);
  newTodoItem.append(span, innerRightContainer);
  container.appendChild(newTodoItem);
};

const renderNewTodo = (todo) => {
  const currentProject = domCollection.currentProject;
  if (currentProject.innerText === todo.projectName) {
    addDomTodo(todo.todoName, todo.projectName);
  }
};

const renderTodos = (todoArray) => {
  todoArray.forEach((todo) => {
    addDomTodo(todo.title, todo.project);
  });
};

const renderMainTodos = () => {
  const mainJson = localStorage.getItem('Main');
  // converts returned JSON into array of todos
  const todoArray = JSON.parse(mainJson).todos;
  if (todoArray) {
    renderTodos(todoArray, 'Main');
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
  renderMainTodos,
  createNewTodo,
  submitNewTodo,
  setTodoEventListener,
  renderTodos,
};
