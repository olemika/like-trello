import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/board`;

const headers = {
  "content-type": "application/json",
  accept: "application/json",
};

export const getAllBoards = async (id) => {
  const options = {
    headers,
  };

  try {
    const res = await axios.get(`${baseUrl}/all/${id}`, options);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getOneBoard = async (id) => {
  const options = {
    headers,
  };

  try {
    const res = await axios.get(`${baseUrl}/${id}`, options);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const crateBoard = async (board) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(board),
  };

  try {
    const res = await fetch(`${baseUrl}/create`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const removeBoard = async (id) => {
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

export const getBoardUsers = async (id) => {
  const options = {
    headers,
  };

  try {
    const res = await fetch(`${baseUrl}/${id}/users`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addBoardUser = async (userId, boardId) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ id: userId }),
  };

  try {
    const res = await fetch(`${baseUrl}/${boardId}/adduser`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const removeBoardUser = async (userId, boardId) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ id: userId }),
  };

  try {
    const res = await fetch(`${baseUrl}/${boardId}/removeuser`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateBoardTitle = async (boardId, title) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ name: title }),
  };

  try {
    const res = await fetch(`${baseUrl}/${boardId}/update`, options);
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

// "/:id/update"
// params = борд айди
// body =  новое имя
// UPDATE boards_olemika SET name = '${req.body.name}' WHERE id = ${req.params.id}
