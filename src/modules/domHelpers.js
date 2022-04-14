import domCollection from './domCollection';
import factoryService from './factories';
import todoService from './todo';
import projectService from './projects';
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

const initializeLocalStorage = () => {
  if (!window.localStorage.getItem('Main')) {
    window.localStorage.setItem(
      'Main',
      JSON.stringify(factoryService.projectFactory())
    );
  }
};

const initializeDomProjects = () => {
  const projectNames = Object.keys(localStorage);
  projectNames.forEach((project) => {
    projectService.setModalProject(project);
  });
};

export default {
  setListeners,
  initializeLocalStorage,
  initializeDomProjects,
  toggleModals,
};
