import {Op} from "sequelize";

import CustomerModel from "../../models/customer";

export const getCustomersController = async (req, res) => {
  try {
    const {pagination, sort, ids, filter} = req.query;
    const {page, perPage} = JSON.parse(pagination || "{}");
    const {field, order} = JSON.parse(sort || "{}");
    const {first_name, last_name, address, phone, email, q, paranoid = true} = JSON.parse(filter || "{}");

    const customers = await CustomerModel.findAndCountAll({
      paranoid,
      limit: Math.min(perPage || 10, 25),
      offset: page >= 0 ? ((page - 1) * perPage) : 0,
      where: {
        ...first_name && {first_name: {[Op.iLike]: `%${first_name}%`}},
        ...last_name && {last_name: {[Op.iLike]: `%${last_name}%`}},
        ...address && {address: {[Op.iLike]: `%${address}%`}},
        ...phone && {phone: {[Op.iLike]: `%${phone}%`}},
        ...email && {email: {[Op.iLike]: `%${email}%`}},
        ...q && {
          [Op.or]: [
            {first_name: {[Op.iLike]: `%${q}%`}},
            {last_name: {[Op.iLike]: `%${q}%`}},
            {email: {[Op.iLike]: `%${q}%`}},
            {phone: {[Op.iLike]: `%${q}%`}}
          ]
        },

        ...ids && {id: {[Op.or]: ids}},
        ...!paranoid && {deleted_at: {[Op.ne]: null}},
      },
      ...sort && {order: [[field, order]]},
    });

    res.status(200).json({customers});
  } catch (e) {
    res.status(400).send(e.message);
  }
}
