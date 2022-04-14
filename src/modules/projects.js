import logic from './logic';
import domHelpers from './domHelpers';
import domCollection from './domCollection';

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
  newOption.innerHTML = projectName;
  projectList.appendChild(newOption);
};

const createNewProject = (projectName) => {
  projectName = projectName[0].toUpperCase() + projectName.slice(1);
  renderSingleProject(projectName);
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

const renderSingleProject = (projectName) => {
  console.log('rendering');
  const domElement = document.createElement('div');
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  domElement.innerText = projectName;
  domElement.appendChild(deleteButton);

  console.log(domElement);

  domCollection.projectContainer.appendChild(domElement);
};

const renderProjects = () => {
  let projectNames = Object.keys(localStorage);
  projectNames = projectNames.filter((name) => name !== 'Main');
  projectNames.forEach((project) => {
    renderSingleProject(project);
  });
};

export default {
  setProjectEventListener,
  setProjectFormListener,
  renderProjects,
  setModalProject,
};
