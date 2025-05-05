
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, p0: string) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "5m",
      });
    return token;
};

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload;
}

export const jwtHelpers = {
    generateToken,
    verifyToken
};