import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response, next: unknown) => {
  try {

    const result = await userService.createAdmin(req);

    res.status(200).json({
      success: true,
      message: "Admin Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error,
    });
  }
};

export const userController = {
  createAdmin,
};
