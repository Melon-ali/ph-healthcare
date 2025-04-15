import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";

const getAllFormDb = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber'])
    const result = await AdminService.getAllFormDb(filters);
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
