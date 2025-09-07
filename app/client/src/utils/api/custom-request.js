import api from "./index";

export const getCount = (url, {paranoid}) => {
  return api.post(url, {paranoid});
}

export const getCustomList = (url, params) => {
  return api.get(url, {params});
}

export const sendMessage = (url, data) => {
  return api.post(url, data);
}

export const getUser = () => {
  return api.get('/user');
}