import api from "./index";

export const getOneByID = (url, params) => {
  return api.get(`${url}/${params.id}`);
}

export const getList = (url, params) => {
  return api.get(url, {params});
}

export const getMany = (url, params) => {
  return api.get(url, {params});
}

export const create = (url, {data}) => {
  return api.post(url, data);
}

export const update = (url, data) => {
  return api.patch(url, data);
}

export const deleteOne = (url, {id}) => {
  return api.delete(url, {data: {id}});
}
