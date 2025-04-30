import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllFormDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    console.log("Options", options);
    const result = await AdminService.getAllFormDb(filters, options);
    // res.status(200).json({
    //   success: true,
    //   message: "Admin Data fetched",
    //   meta: result.meta,
    //   data: result.data,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data fetched",
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error);
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

const deleteFormDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Deleteted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteFormDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Deleteted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllFormDb,
  getByIdFromDB,
  updateIntoDB,
  deleteFormDB,
  softDeleteFormDB
};
