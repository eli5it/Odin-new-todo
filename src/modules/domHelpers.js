import domCollection from './domCollection';
import logic from './logic';
// Changes visibility of project modal and overlay
const toggleModals = () => {
  const modal = domCollection.projectModal;
  const modalOverlay = domCollection.modalOverlay;
  modal.classList.toggle('modal-closed');
  modalOverlay.classList.toggle('modal-closed');
};

const setProjectEventListener = () => {
  const projectButton = domCollection.projectButton;
  projectButton.addEventListener('click', () => {
    toggleModals();
  });
};

const setOverlayListener = () => {
  const modalOverlay = domCollection.modalOverlay;
  modalOverlay.addEventListener('click', () => {
    toggleModals();
  });
};
const createNewProject = (projectName) => {
  const projectContainer = domCollection.projectContainer;
  const newProject = document.createElement('li');
  newProject.innerHTML = projectName;
  projectContainer.appendChild(newProject);
  logic.createLocalProject(projectName);
};

//!!! Add Validation to input
const setProjectFormListener = () => {
  const projectForm = domCollection.projectForm;
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewProject(domCollection.projectName.value);
    toggleModals();
  });
};

const setListeners = () => {
  setOverlayListener();
  setProjectEventListener();
  setProjectFormListener();
};

export default {
  setListeners,
};
