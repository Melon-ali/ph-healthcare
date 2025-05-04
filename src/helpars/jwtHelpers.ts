
import jwt from "jsonwebtoken";

const generateToken = (payload: any, secret: string) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "5m",
      });
    return token;
};

export const jwtHelpers = {
    generateToken,
};