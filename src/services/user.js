import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/user`;

const headers = {
  "content-type": "application/json",
  accept: "application/json",
};

export const registerUser = async (user) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  };

  try {
    const res = await fetch(`${baseUrl}/create`, options);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const loginUser = async (id) => {
  const options = {
    headers,
  };

  try {
    const res = await axios.get(`${baseUrl}/auth`, options);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateUser = async (user) => {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  };

  try {
    const res = await fetch(`${baseUrl}/update`, options);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUser = async (id) => {
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

export const getAllUsers = async () => {
  const options = {
    headers,
  };

  try {
    const res = await axios.get(`${baseUrl}/all`, options);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
