import './style.css';
import factories from './modules/factories';
import domHelpers from './modules/domHelpers';
import todoService from './modules/todo';
import projectService from './modules/projects';
window.onload = () => {
  domHelpers.initializeLocalStorage();
  domHelpers.setListeners();
  projectService.renderProjects();
  todoService.renderMainTodos();
  domHelpers.initializeDomProjects();
  projectService.initializeDefaultListeners();
};
