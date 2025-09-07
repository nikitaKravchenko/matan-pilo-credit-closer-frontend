import {Router} from "express";

import {authGuard} from "../../middlewares/auth-guard";

import {
  createPaymentRequestMiddleware,
  updatePaymentRequestMiddleware
} from "../../middlewares/request/payment";

import {
  getPaymentController,
  getPaymentsController,
  getCountPaymentsController,
  createPaymentController,
  updatePaymentController,
  deletePaymentController,
} from "../../controllers/payment.controllers";

export function routerPayments() {
  const router = Router();

  router.get(
    '/:id',
    authGuard,
    getPaymentController,
  );

  router.get(
    '/',
    authGuard,
    getPaymentsController
  );

  router.post(
    '/count',
    authGuard,
    getCountPaymentsController
  );

  router.post(
    '/',
    authGuard,
    createPaymentRequestMiddleware,
    createPaymentController
  );

  router.patch(
    '/',
    authGuard,
    updatePaymentRequestMiddleware,
    updatePaymentController
  );

  router.delete(
    '/',
    authGuard,
    deletePaymentController
  );

  return router;
}