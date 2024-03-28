import { Request, Response } from "express";
import { createSession, invalidateSession } from "../db";
import { signJWT } from "../utils/jwt.utils";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";

// register handler
export async function createRegisterHandler(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;
    if (!(email && password && name)) {
      return res.status(401).send("All Fileds are necessary 🙄");
    }

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).send("User with email already exists 😏");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      name,
      password: hashPassword,
    });

    const user = await newUser.save();
    res.status(200).send("User Added 😁");
  } catch (error) {
    return res.status(500).send(error);
  }
}

// login handler
export async function createSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(401).send("All Fileds are necessary 🙄");
  }

  // const user = getUser(email);
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(402).send("User not Found 😔");
  }

  if (user) {
    // @ts-ignore
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
      });

      res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
      });
      return res.status(401).send("Invalid password 😖");
    }
  }

  // @ts-ignore
  const session = createSession(email, user?.name);

  // create access token
  const accessToken = signJWT(
    { email: user.email, name: user.name, sessionId: session.sessionId },
    "5s"
  );

  const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

  // set access token in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // send user back
  return res.send(session);
}

// get the session session
export function getSessionHandler(req: Request, res: Response) {
  // @ts-ignore
  return res.send(req.user);
}

// log out handler
export function deleteSessionHandler(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  // @ts-ignore
  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
}
