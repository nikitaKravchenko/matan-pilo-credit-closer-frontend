import {toast} from "../../Toastify";
import {checkUserAPI, loginAPI, logoutAPI} from "../../../utils/api/auth";

const authProvider = {
  login: async (params) => {
    try {
      const data = await loginAPI(params);
      toast(data.message, 'success');
      return Promise.resolve();
    } catch (e) {
      toast(e.response.data, 'error');
      return Promise.reject();
    }
  },
  logout: async (params) => {
    try {
      const {data} = await logoutAPI();
      toast(data.message, 'success');
      return Promise.resolve();
    } catch (e) {
      toast(e.response.data, 'error');
      return Promise.reject();
    }
  },
  checkAuth: async (params) => {
    try {
      return await checkUserAPI();
    } catch (e) {
      toast(e.response.data, 'error');
      return Promise.reject();
    }
  },
  checkError: async (params) => {
    if (params.status === 401 || params.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: (params) => {
    return Promise.resolve();
  },
  getPermissions: (params) => {
    return Promise.reject('Unknown method');
  },
}

export default authProvider