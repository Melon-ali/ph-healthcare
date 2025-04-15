import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllFormDb = async (req: Request, res: Response) => {
  const result = await AdminService.getAllFormDb();
  res.status(200).json({
    success: true,
    message: "Admin Data fetched",
    data: result,
  });
};

export const AdminController = {
  getAllFormDb,
};
