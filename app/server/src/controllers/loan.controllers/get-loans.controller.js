import {Op} from "sequelize";
import LoanModel from "../../models/loan";

export const getLoansController = async (req, res) => {
  try {
    const {pagination, sort, ids, filter} = req.query;
    const {page, perPage} = JSON.parse(pagination || "{}");
    const {field, order} = JSON.parse(sort || "{}");
    const {
      status,
      start_created,
      end_created,
      customer_id,
      paranoid = true
    } = JSON.parse(filter || "{}");

    const loans = await LoanModel.findAndCountAll({
      paranoid,
      limit: Math.min(perPage || 10, 25),
      offset: page >= 0 ? ((page - 1) * perPage) : 0,
      where: {
        ...status && {status: {[Op.eq]: status}},
        ...customer_id && {customer_id},
        ...(start_created || end_created) && {
          created_at: {
            [Op.and]: {
              ...start_created && {[Op.gte]: start_created},
              ...end_created && {[Op.lte]: end_created},
            }
          }
        },
        ...ids && {id: {[Op.or]: ids}},
        ...!paranoid && {deleted_at: {[Op.ne]: null}}
      },
      ...sort && {order: [[field, order]]},
    });

    res.status(200).json({loans});
  } catch (e) {
    res.status(400).send(e.message);
  }
}
