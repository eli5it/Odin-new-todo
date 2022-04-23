const domCollection = {
  projectModal: document.querySelector('.project-modal'),
  modalOverlay: document.querySelector('.modal-overlay'),
  todoModal: document.querySelector('.todo-modal'),
  todoFormContents: {
    todoName: document.getElementById('todo-name'),
    description: document.getElementById('description'),
    todoDate: document.getElementById('todo-date'),
    priority: document.getElementById('priority'),
    projectName: document.getElementById('project'),
  },
  todoForm: document.querySelector('.todo-form'),
  projectForm: document.querySelector('.project-form'),
  todoFormButton: document.getElementById('todo-form-submit'),
  projectButton: document.querySelector('.add-project'),
  projectForm: document.querySelector('.project-form'),
  projectName: document.getElementById('project-name'),
  projectContainer: document.querySelector('.project-container'),
  todoButton: document.querySelector('.add-todo'),
  projectList: document.getElementById('project'),
  currentTodos: document.querySelector('.selected-todos-container'),
  currentProject: document.querySelector('.project-title'),
  projectHeadingContainer: document.querySelector('.inner-main-container'),
  defaultProjects: {
    main: document.querySelector('.nav-main'),
    today: document.querySelector('.nav-today'),
    week: document.querySelector('.nav-week'),
  },
  todoInfoModal: document.querySelector('.todo-info-modal'),
  todoInfo: {
    project: document.querySelector('.project-info'),
    title: document.querySelector('.todo-name-info'),
    dueDate: document.querySelector('.due-date-info'),
    details: document.querySelector('.details-info'),
    priority: document.querySelector('.priority-info'),
  },
};

export default domCollection;
