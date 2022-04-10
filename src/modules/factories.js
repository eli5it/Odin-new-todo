const todoFactory = (title, description, dueDate, priority) => {
  return {
    title,
    description,
    dueDate,
    priority,
  };
};

const projectFactory = () => {
  const todos = [];
  return {
    todos,
  };
};

export default { todoFactory, projectFactory };
