import {Router} from 'express';

import {authGuard} from "../../middlewares/auth-guard.js";

import {
  createCustomerRequestMiddleware,
  updateCustomerRequestMiddleware
} from "../../middlewares/request/customer";

import {
  getCustomerController,
  getCustomersController,
  getCustomersCountController,
  createCustomerController,
  updateCustomerController,
  reestablishCustomerController,
  deleteCustomerController,
  deleteCustomerAbsolutController
} from "../../controllers/customer.controllers";

export function routerCustomer() {
  const router = Router();

  router.get(
    '/:id',
    authGuard,
    getCustomerController
  );

  router.get(
    '/',
    authGuard,
    getCustomersController
  );

  router.post(
    '/count',
    authGuard,
    getCustomersCountController
  );

  router.post(
    '/',
    authGuard,
    createCustomerRequestMiddleware,
    createCustomerController
  );

  router.patch(
    '/',
    authGuard,
    updateCustomerRequestMiddleware,
    updateCustomerController
  );

  router.delete(
    '/',
    authGuard,
    deleteCustomerController
  );

  router.post(
    '/restore',
    authGuard,
    reestablishCustomerController
  );

  router.delete(
    '/destroy',
    authGuard,
    deleteCustomerAbsolutController
  );

  return router;
}