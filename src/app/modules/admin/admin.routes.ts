import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllFormDb);

router.get("/:id", AdminController.getByIdFromDB);

router.patch("/:id", AdminController.updateIntoDB);

router.delete("/:id", AdminController.deleteFormDB);

export const AdminRoutes = router;
