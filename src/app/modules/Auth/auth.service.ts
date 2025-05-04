import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";

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

export const AuthServices = {
  loginUser,
};
