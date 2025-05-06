import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.post("/login", AuthController.loginUser);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/change-password", auth(UserRole.SUPER_AMDIN, UserRole.DOCTOR, UserRole.PAITENT),  AuthController.changePassword);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
