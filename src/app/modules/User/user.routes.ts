import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/client";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  auth(UserRole.SUPER_AMDIN, UserRole.ADMIN),
  userController.createAdmin
);

export const userRoutes = router;
