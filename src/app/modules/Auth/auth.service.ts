import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { UserStatus } from "../../../generated/prisma";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import emailSender from "./emailSender";

const loginUser = async (payload: { email: string; password: string }) => {
  // Check if user exists
  const userData = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check password
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  // Generate tokens
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData.id,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData.id,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }

  const userData = await prisma.user.findUnique({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData.id,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Verify old password
  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

  // Update password
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData.id,
    },
    config.jwt.reset_pass_token_secret as Secret,
    config.jwt.reset_pass_token_expires_in as string
  );

  // console.log(resetPassToken);

  const resetPassLink =
    config.reset_pass_link + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
    <div>
        <P>Dear User</P>
        <P>Your Password Reset Link is: <a href="${resetPassLink}">
        <button>
            Reset Password
        </button></a></P>
    </div>
    `
  );

  // console.log(resetPassLink);
};

const resetPassword = async (token: string, payload: { id: string,password: string }) => {
  // console.log({token, payload});

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_token_secret as Secret
  );

  // console.log(isValidToken)

  if(!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }
}

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};
