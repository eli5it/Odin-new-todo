import domCollection from './domCollection';
import factoryService from './factories';
import todoService from './todo';
import projectService from './projects';
import {
  isToday,
  differenceInCalendarWeeks,
  parseISO,
  differenceInCalendarDays,
} from 'date-fns';

// Changes visibility of project modal and overlay
const toggleModals = (modal) => {
  const modalOverlay = domCollection.modalOverlay;

  if (modal === 'project') {
    const projectModal = domCollection.projectModal;
    projectModal.classList.toggle('modal-closed');
  } else {
    const todoModal = domCollection.todoModal;
    todoModal.classList.toggle('modal-closed');
  }
  modalOverlay.classList.toggle('modal-closed');
};

const toggleModal = (modal) => {
  modal.classList.toggle('modal-closed');
};
const turnOffModals = () => {
  const allModals = document.querySelectorAll('.modal');
  allModals.forEach((modal) => {
    if (!modal.classList.contains('modal-closed')) {
      toggleModal(modal);
    }
  });
};

const setOverlayListener = () => {
  const modalOverlay = domCollection.modalOverlay;
  modalOverlay.addEventListener('click', () => {
    turnOffModals();
  });
};

const setListeners = () => {
  setOverlayListener();
  projectService.setProjectEventListener();
  projectService.setProjectFormListener();
  todoService.setTodoEventListener();
  todoService.submitNewTodo();
};

const setDefaultProject = (project) => {
  if (!localStorage.getItem(project)) {
    localStorage.setItem(
      project,
      JSON.stringify(factoryService.projectFactory())
    );
  }
};

const initializeLocalStorage = () => {
  setDefaultProject('Main');
};

const initializeDomProjects = () => {
  let projectNames = Object.keys(localStorage);
  projectNames = projectNames.filter(
    (name) => name !== 'Today' && name !== 'Week'
  );
  projectNames.forEach((project) => {
    projectService.setModalProject(project);
  });
};

const moveTodo = (todo, projectName) => {
  const project = JSON.parse(localStorage.getItem(projectName));
  project.todos.push(todo);
  localStorage.setItem(projectName, JSON.stringify(project));
};

const isDueToday = (todo) => {
  const dueDate = parseISO(todo.dueDate);
  return isToday(dueDate);
};
const checkToday = (todo) => {
  if (isDueToday(todo)) {
    moveTodo(todo, 'Today');
  }
};
const isDueThisWeek = (todo) => {
  let today = new Date();
  today = today.toISOString();
  today = parseISO(today);
  const difference = differenceInCalendarDays(parseISO(todo.dueDate), today);
  return difference < 8;
};
const checkThisWeek = (todo) => {
  if (isDueThisWeek(todo)) {
    moveTodo(todo, 'Week');
  }
};

const clearDatedTodos = () => {
  localStorage.removeItem('Today');
  localStorage.removeItem('Week');
  setDefaultProject('Today');
  setDefaultProject('Week');
};

const filterTodosByDate = () => {
  clearDatedTodos();
  const keys = Object.keys(localStorage).filter(
    (key) => key !== 'Today' && key !== 'Week'
  );
  keys.forEach((key) => {
    const todoArray = JSON.parse(localStorage.getItem(key)).todos;
    todoArray.forEach((todo) => {
      checkToday(todo);
      checkThisWeek(todo);
    });
  });
};

export default {
  setListeners,
  initializeLocalStorage,
  initializeDomProjects,
  toggleModals,
  filterTodosByDate,
  isDueToday,
  isDueThisWeek,
};
