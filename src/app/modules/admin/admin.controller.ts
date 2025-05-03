import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    console.log("Options", options);
    const result = await AdminService.getAllFromDB(filters, options);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
    console.log(error, 'Error while fetching admin data');
  }
};

const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: 200,      
      success: true,
      message: "Admin Data fetched By Id",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIntoDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
    console.log(error, 'Error while deleting admin data');
  }
};

const softDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Soft Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};