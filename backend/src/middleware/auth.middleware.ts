import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized: Missing or invalid token"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {username: string};
        req.user = decoded;
        next();
    }catch (error) {
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: "Token expired" });
  }

  return res.status(403).json({ message: "Invalid token" });
}
}