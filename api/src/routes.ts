import { Express } from "express";
import {
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
  createRegisterHandler,
} from "./controllers/session.controller";
import { requireUser } from "./middleware/requireUser";

function routes(app: Express) {
  // register
  app.post("/api/session/register", createRegisterHandler);

  // login
  app.post("/api/session", createSessionHandler);

  // get the current session
  app.get("/api/session", requireUser, getSessionHandler);

  // logout
  app.delete("/api/session", requireUser, deleteSessionHandler);
}

export default routes;
