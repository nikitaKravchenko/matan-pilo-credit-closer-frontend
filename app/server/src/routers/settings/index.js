import {Router} from "express";

import {authGuard} from "../../middlewares/auth-guard";
import {updateSettingRequestMiddleware} from "../../middlewares/request/settings";

import {
  getSettingController,
  updateSettingController
} from "../../controllers/setting.controllers";

export function routerSettings() {
  const router = Router();

  router.get(
    '/:id',
    authGuard,
    getSettingController
  );

  router.patch(
    '/',
    authGuard,
    updateSettingRequestMiddleware,
    updateSettingController
  );

  return router;
}