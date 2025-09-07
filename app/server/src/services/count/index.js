import {Op} from "sequelize";

export const FindCount = async (model, paranoid) => {
  return await model.count({
    paranoid,
    where: {
      ...!paranoid && {
        deleted_at: {[Op.ne]: null}
      }
    }
  });
}