import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// sign jwt

const privateKey: string = process.env.PRIVATE_KEY || "";
const publicKey: string = process.env.PUBLIC_KEY || "";

export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn,
  });
}

// verify jwt
export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
