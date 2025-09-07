import {Router} from 'express';

import {routerAuth} from "./auth";
import {routerLoans} from "./loans";
import {routerAnalytics} from "./analytics";
import {routerCustomer} from "./customers";
import {routerPayments} from "./payments";
import {routerCalendar} from "./calendar";
import {routerSettings} from "./settings";
import {routerMessage} from "./message";
import {routerUser} from "./user";
import {routerNotes} from "./notes";

export function routers() {
  const router = Router();

  router.use('/auth', routerAuth());
  router.use('/loans', routerLoans());
  router.use('/payments', routerPayments());
  router.use('/analytics', routerAnalytics());
  router.use('/customers', routerCustomer());
  router.use('/calendar', routerCalendar());
  router.use('/settings', routerSettings());
  router.use('/message', routerMessage());
  router.use('/user', routerUser());
  router.use('/notes', routerNotes());

  return router;
}