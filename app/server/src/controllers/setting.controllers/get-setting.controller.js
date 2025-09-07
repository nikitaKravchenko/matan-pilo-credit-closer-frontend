import SettingModel from "../../models/settings";

export const getSettingController = async (req, res) => {
  try {
    const setting = await SettingModel.findOne({
      where: {name: req.params.id}}
    );

    res.status(200).json(setting);
  } catch (e) {
    res.status(400).send(e.message);
  }
}