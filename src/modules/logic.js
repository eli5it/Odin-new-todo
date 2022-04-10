import factoryService from './factories';
const createLocalProject = (projectName) => {
  const newProject = factoryService.projectFactory(projectName);
  window.localStorage.setItem(projectName, newProject);
};

export default { createLocalProject };
