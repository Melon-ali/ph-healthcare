import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged In Successfully!",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {

    const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token generated successfully",
    data: result,
    // data: {
    //   accessToken: result.accessToken,
    //   needPasswordChange: result.needPasswordChange,
    // },
  });
});


const changePassword = catchAsync(async (req: Request & {user?: any}, res: Response) => {

  const user = req.user;

  const result = await AuthServices.changePassword(user, req.body);

  console.log(result)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Changed Successfully!",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request & {user?: any}, res: Response) => {


  const result = await AuthServices.forgotPassword(req.body);

  console.log(result)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Changed Successfully!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request , res: Response) => {

  const token = req.headers.authorization || "" ;

   await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Reset Successfully!",
    data: null,
  });
})

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};
