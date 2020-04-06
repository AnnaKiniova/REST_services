const allTasks = require('./tasks.json');

const getAll = async () => {
  return await allTasks;
};

const addTask = newTask => {
  allTasks.push(newTask);
  return newTask;
};

const getTaskById = async id => {
  return await allTasks.find(item => item.id === id);
};

const updateTask = async (params, taskData) => {
  const updatedTask = await getTaskById(params.id);
  console.log('in update repo');
  Object.assign(updatedTask, taskData);
  // updatedTask.boardId = params.boardId;
  return updatedTask;
};

const deleteTask = async params => {
  console.log('entered delete in repo');
  const index = await allTasks.findIndex(
    item => item.id === params.id // && item.boardId === params.boardId
  );
  console.log(allTasks);
  console.log(index);
  if (index !== -1) {
    allTasks.splice(index, 1);

    console.log('in delete repo');
    console.log(allTasks);
    return true;
  }
  return false;
};

module.exports = { getAll, addTask, getTaskById, updateTask, deleteTask };
