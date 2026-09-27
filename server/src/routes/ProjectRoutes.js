import { Router } from "express";
import {
  createProject,
  getpublishProject,
  publishProject,
  listProject,
  getProject,
  DeleteProject,
  updateProject,
} from "../controllers/ProjectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const projectRouter = Router();
projectRouter.get("/publish/:id", getpublishProject);
projectRouter.use(authMiddleware);
projectRouter.post("/", createProject);
projectRouter.get("/", listProject);
projectRouter.get("/:id", getProject);
projectRouter.delete("/:id", DeleteProject);
projectRouter.patch("/:id/files", updateProject);
projectRouter.patch("/:id/publish", publishProject);
export default projectRouter;