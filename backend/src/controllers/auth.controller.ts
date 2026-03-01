import {Request, Response} from "express";
import { login, logOut } from "../services/auth.service";
import { refreshToken } from "../services/auth.service";
import dotenv from 'dotenv';
dotenv.config();


type loginInput = {
    username: string;
    password: string;
}

export const loginController = async(req: Request<{},{}, loginInput>, res: Response) =>{
    try{
        const result = await login(req.body);
        res.status(200).json({success: true, data: result});
    }catch(error: unknown){
        res.status(400).json(
            {success: false, 
            message: error instanceof Error ? error.message : "An unexpected error occurred"}
        );
    }
}
export const refreshController = async (
  req: Request<{}, {}, { refreshToken: string }>,
  res: Response
) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const tokens = await refreshToken(token);

    return res.status(200).json(tokens);

  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
}

export const logoutController = async (
  req: Request<{}, {}, { refreshToken: string }>,
  res: Response
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required"
    });
  }

  try {
    const result = await logOut(refreshToken);

    return res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error: unknown) {
    return res.status(403).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Invalid or expired refresh token"
    });
  }
};