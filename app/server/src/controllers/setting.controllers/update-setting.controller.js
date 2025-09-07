import SettingModel from "../../models/settings";

export const updateSettingController = async (req, res) => {
  try {
    const {id, value, notify} = req.body;

    await SettingModel.update({value}, {where: {name: id}});

    if(notify) {
      await SettingModel.update({value: notify.value}, {where: {name: notify.id}});
    }

    res.status(200).json(req.body);
  } catch (e) {
    res.status(400).send(e.message);
  }
}