const todoFactory = (title, description, dueDate, priority, project) => {
  return {
    title,
    description,
    dueDate,
    priority,
    project,
  };
};

const projectFactory = () => {
  const todos = [];
  return {
    todos,
  };
};

export default { todoFactory, projectFactory };
