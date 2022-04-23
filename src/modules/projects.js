import domHelpers from './domHelpers';
import domCollection from './domCollection';
import logic from './logic';
import todoService from './todo';

const setProjectEventListener = () => {
  const projectButton = domCollection.projectButton;
  projectButton.addEventListener('click', () => {
    domHelpers.toggleModals('project');
  });
};

const setModalProject = (projectName) => {
  const projectList = domCollection.projectList;
  const newOption = document.createElement('option');
  newOption.value = projectName;
  newOption.id = `modal-project-${projectName}`;
  newOption.innerHTML = projectName;
  projectList.appendChild(newOption);
};

const removeModalProject = (projectName) => {
  const projectToRemove = document.getElementById(
    `modal-project-${projectName}`
  );
  projectToRemove.remove();
};

const createNewProject = (projectName) => {
  projectName = projectName[0].toUpperCase() + projectName.slice(1);
  renderSingleProject(projectName);
  logic.createLocalProject(projectName);
  setModalProject(projectName);
};

//!!! Add Validation to input
const setProjectFormListener = () => {
  const projectForm = domCollection.projectForm;
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewProject(domCollection.projectName.value);
    domHelpers.toggleModals('project');
  });
};
const setDeleteListener = (deleteButton, project, projectName) => {
  deleteButton.addEventListener('click', () => {
    logic.removeLocalProject(projectName);
    removeModalProject(projectName);
    project.remove();
  });
};

const deleteChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const renderProjectView = (projectName) => {
  const todoContainer = domCollection.currentTodos;
  if (projectName !== domCollection.currentProject.innerHTML) {
    domCollection.currentProject.innerHTML = projectName;
    deleteChildren(todoContainer);
    const todosToRender = JSON.parse(localStorage.getItem(projectName)).todos;
    todoService.renderTodos(todosToRender);
  }
};

const setProjectClickListener = (project, projectName) => {
  project.addEventListener('click', () => {
    renderProjectView(projectName);
  });
};

const initializeDefaultListeners = () => {
  const defaultProjects = domCollection.defaultProjects;
  for (const key in defaultProjects) {
    setProjectClickListener(
      defaultProjects[key],
      `${key[0].toUpperCase()}${key.slice(1)}`
    );
  }
};

const setHoverListener = (container, deleteButton) => {
  container.addEventListener('mouseenter', () => {
    deleteButton.classList.toggle('visible');
  });
  container.addEventListener('mouseleave', () => {
    deleteButton.classList.toggle('visible');
  });
};

const renderSingleProject = (projectName) => {
  const circleIcon = document.createElement('i');
  const container = document.createElement('div');
  const leftContainer = document.createElement('div');
  const rightContainer = document.createElement('div');
  const domElement = document.createElement('div');
  const deleteButton = document.createElement('i');
  container.className = 'sidebar-project';
  leftContainer.className = 'left-sidebar-container';
  rightContainer.className = 'right-sidebar-container';
  circleIcon.classList.add('material-icons');
  circleIcon.classList.add('circle-icon');
  circleIcon.innerText = 'fiber_manual_record';
  deleteButton.classList.add('material-icons');
  deleteButton.classList.add('delete-project');
  deleteButton.innerText = 'delete';
  setDeleteListener(deleteButton, container, projectName);
  setProjectClickListener(domElement, projectName);
  domElement.innerText = projectName;
  domElement.className = 'sidebar-project-name';
  leftContainer.append(circleIcon, domElement);
  rightContainer.appendChild(deleteButton);
  setHoverListener(container, deleteButton);
  container.append(leftContainer, rightContainer);
  domCollection.projectContainer.appendChild(container);
};

const renderProjects = () => {
  let projectNames = Object.keys(localStorage);
  projectNames = projectNames.filter(
    (name) => name !== 'Main' && name !== 'Today' && name !== 'Week'
  );
  projectNames.forEach((project) => {
    renderSingleProject(project);
  });
};

export default {
  setProjectEventListener,
  setProjectFormListener,
  renderProjects,
  setModalProject,
  initializeDefaultListeners,
};
