import {Router} from "express";

import {authGuard} from "../../middlewares/auth-guard";
import {sendMessageRequestMiddleware} from "../../middlewares/request/message";
import {sendMessageController} from "../../controllers/message.controllerts";

export function routerMessage() {
  const router = Router();

  router.post(
    '/',
    authGuard,
    sendMessageRequestMiddleware,
    sendMessageController
  );

  return router;
}