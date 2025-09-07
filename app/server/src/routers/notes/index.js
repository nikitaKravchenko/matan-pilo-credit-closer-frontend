import {Router} from "express";

import {authGuard} from "../../middlewares/auth-guard.js";

import {
  createNotesRequestMiddleware,
  updateNotesRequestMiddleware
} from "../../middlewares/request/note";

import {
  getNoteController,
  getNotesController,
  createNoteController,
  updateNoteController,
  deleteNoteController,
} from "../../controllers/note.controllers";

export function routerNotes() {
  const router = Router();

  router.get(
    '/:id',
    authGuard,
    getNoteController
  );

  router.get(
    '/',
    authGuard,
    getNotesController
  );

  router.post(
    '/',
    authGuard,
    createNotesRequestMiddleware,
    createNoteController
  );

  router.patch(
    '/',
    authGuard,
    updateNotesRequestMiddleware,
    updateNoteController
  );

  router.delete(
    '/',
    authGuard,
    deleteNoteController
  );

  return router;
}