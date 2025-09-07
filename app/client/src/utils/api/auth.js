import api from "./index";
import {toast} from "../../components/Toastify";

export const loginAPI = async (login) => {
  const {data: {user, message, redirect}} = await api.post('/auth/login', login);

  return {user, message, redirect};
}

export const logoutAPI = async () => {
  return api.get('/auth/logout');
}

export const checkUserAPI = async () => {
  const {data: {redirect, message}} = await api.get(`/auth/check-auth`, {
    params: {url: window.location.pathname}
  });

  redirectPath(redirect);
  return message || 'success auth';
}

export const redirectPath = (path) => {
  if (path) {
    window.location.href = path;
  }
}

export const forgotAPI = (email) => {
  return api.post('/auth/forgot-password', email);
}

export const resetAPI = async (data) => {
  const {data: {message, redirect}} = await api.post('/auth/reset-password', data);

  toast(message, 'success');
  redirectPath(redirect);
}