import {Router} from "express";

import {authGuard} from "../../middlewares/auth-guard.js";

import {
  getCalendarController,
  getCalendarEventsController
} from '../../controllers/calendar.controllers';

export function routerCalendar() {
  const router = Router();

  router.get('/weekend',
    authGuard,
    getCalendarController
  );

  router.get(
    '/event',
    authGuard,
    getCalendarEventsController
  );

  return router;
}