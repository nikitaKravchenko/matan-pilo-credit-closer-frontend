import {Router} from "express";

import {authGuard} from "../../middlewares/auth-guard";

import {
  createLoanRequestMiddleware,
  updateLoanRequestMiddleware
} from "../../middlewares/request/loan";

import {
  getLoanController,
  getLoansController,
  getLoansCountController,
  createLoanController,
  updateLoanController,
  reestablishLoanController,
  deleteLoanController,
  deleteLoanAbsolutController
} from "../../controllers/loan.controllers";

export function routerLoans() {
  const router = Router();

  router.get(
    '/:id',
    authGuard,
    getLoanController
  );

  router.get(
    '/',
    authGuard,
    getLoansController
  );

  router.post(
    '/',
    authGuard,
    createLoanRequestMiddleware,
    createLoanController
  );

  router.post(
    '/count',
    authGuard,
    getLoansCountController
  );

  router.patch(
    '/',
    authGuard,
    updateLoanRequestMiddleware,
    updateLoanController
  );

  router.delete(
    '/',
    authGuard,
    deleteLoanController
  );

  router.post(
    '/restore',
    authGuard,
    reestablishLoanController
  );

  router.delete(
    '/destroy',
    authGuard,
    deleteLoanAbsolutController
  );

  return router;
}