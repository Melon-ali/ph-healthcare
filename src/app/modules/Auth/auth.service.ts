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
  console.log(isCorrectPassword);

  const accessToken = jwt.sign(
    { email: userData.email, role: userData.role },
    "abc",
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );
  console.log({accessToken});

  return userData;
};

export const AuthServices = {
  loginUser,
};
