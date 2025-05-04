import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const accessToken = jwt.sign(
    { email: userData.email, role: userData.role },
    "abc",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  const refreshToken = jwt.sign(
    { email: userData.email, role: userData.role },
    "abcd",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );
  console.log({ accessToken });

  return { accessToken,refreshToken, needPasswordChange: userData.needPasswordChange };
};

export const AuthServices = {
  loginUser,
};
