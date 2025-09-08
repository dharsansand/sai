import axios from "axios";
import config from "../config";

export const axiosInstance = async (method, endpoint, payload) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios({
      method,
      url: endpoint,
      data: payload,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }); 

    return res;
  } catch (error) {
    return error;
  }
};
export const getData = async (modelName) => {
  const res = await axiosInstance("get", `${config.apiUrl}/${modelName}`);
  return res;
};
export const getOneData = async (modelName, id) => {
  const res = await axiosInstance("get", `${config.apiUrl}/${modelName}/${id}`);
  return res;
};
export const postData = async (modelName, payload) => {
  const res = await axiosInstance(
    "post",
    `${config.apiUrl}/${modelName}`,
    payload
  );
  return res;
};
export const postOneData = async (modelName, payload, id) => {
  const res = await axiosInstance(
    "put",
    `${config.apiUrl}/${modelName}/${id}`,
    payload
  );
  return res;
};
export const deleteData = async (modelName, id) => {
  const res = await axiosInstance(
    "delete",
    `${config.apiUrl}/${modelName}/${id}`
  );
  return res;
};
