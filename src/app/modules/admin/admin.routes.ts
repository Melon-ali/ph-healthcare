import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllFormDb);

router.get("/:id", AdminController.getByIdFromDB);

export const AdminRoutes = router;
