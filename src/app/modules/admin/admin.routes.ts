import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_AMDIN, UserRole.ADMIN),
  AdminController.getAllFromDB
);

router.get(
  "/:id",
  auth(UserRole.SUPER_AMDIN, UserRole.ADMIN),
  AdminController.getByIdFromDB
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_AMDIN, UserRole.ADMIN),
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDB
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_AMDIN, UserRole.ADMIN),
  AdminController.deleteFromDB
);

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_AMDIN, UserRole.ADMIN),
  AdminController.softDeleteFromDB
);

export const AdminRoutes = router;
