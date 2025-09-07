import {Router} from "express";

import {authGuard} from "../../middlewares/auth-guard";

import {
  getAnalyticController,
  getAnalyticsController,
} from "../../controllers/analytic.controllers";

export function routerAnalytics() {
  const router = Router();

  router.get(
    '/all/:id',
    authGuard,
    getAnalyticController
  );

  router.get(
    '/interval',
    authGuard,
    getAnalyticsController
  );

  return router;
}