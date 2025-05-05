import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const router = express.Router();

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            
            if (!token) {
                throw new Error("You Are Not Authorized");
            }

            const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);
            console.log(verifiedUser);

            if(roles.length && !roles.includes(verifiedUser.role)) {
                throw new Error("You Are Not Authorized");
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}

router.post("/", auth("ADMIN", "SUPER_ADMIN", "DOCTOR"), userController.createAdmin);

export const userRoutes = router;