import { UserStatus } from "../../../generated/prisma";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect Password");
  }

  console.log(isCorrectPassword);

  const accessToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    "abcd"
  );

  const refreshToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    "abcdef"
  );

  console.log({ accessToken });

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token, "abcdef")
    console.log(decodedData);
  } catch (error) {
    throw new Error("You Are Not Authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    { email: userData.email, 
    role: userData.role },
    "abcd"
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
