import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllFormDb = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllFormDb(req.query);
    res.status(200).json({
      success: true,
      message: "Admin Data fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    });
  }
};

export const AdminController = {
  getAllFormDb,
};
