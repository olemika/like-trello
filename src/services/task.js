const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/task`;

const headers = {
  "content-type": "application/json",
  accept: "application/json",
};

export const crateTask = async (task) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  };

  try {
    const res = await fetch(`${baseUrl}/create`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const removeTask = async (id) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(id),
  };

  try {
    const res = await fetch(`${baseUrl}/delete`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateTaskStatus = async (statusId, taskId) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ status: statusId, id: taskId }),
  };

  try {
    const res = await fetch(`${baseUrl}/setstatus`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateTaskContent = async (task) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  };

  try {
    const res = await fetch(`${baseUrl}/update`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};
