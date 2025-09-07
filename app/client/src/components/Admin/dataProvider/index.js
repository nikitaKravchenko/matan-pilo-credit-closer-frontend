import {create, deleteOne, getList, getMany, getOneByID, update} from "../../../utils/api/data-provider";
import {removeRepeatObject} from "../../../utils/functions/workingObject";
import {getCustomList} from "../../../utils/api/custom-request";

const dataProvider = {
  getList: async (resource, params) => {
    if (resource === 'calendar/event' && !params.filter?.start) {
      return {
        data: [],
        total: 0
      }
    }
    if (resource === 'calendar/event') {
      const {data} = await getCustomList(resource, params.filter);
      return {data: data.payments, total: 0}
    }
    if (resource.includes('analytics')) {
      const {data} = await getCustomList(resource, params.filter);
      return {data, total: 0}
    }

    const {data} = await getList(resource, params);

    return {
      data: data[resource].rows,
      total: data[resource].count
    }
  },
  getOne: async (resource, params) => {
    if (params.id && params.id !== 0 && params.id !== "undefined" && params.id !== 'destroy') {
      return await getOneByID(resource, params);
    }
    return {data: {id: params.id, message: 'not found id'}};
  },
  getMany: async (resource, params) => {
    const {data} = await getMany(resource, params)
    return {
      data: data[resource].rows,
      total: data[resource].count
    }
  },
  update: async (resource, params) => {
    return await update(resource, removeRepeatObject(params.data, params.previousData));
  },
  create: async (resource, params) => {
    return await create(resource, params)
  },
  delete: async (resource, params) => {
    return await deleteOne(resource, params);
  }
}

export default dataProvider;