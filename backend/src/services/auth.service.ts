import prisma from "../config/prisma";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

type loginInput = {
    username: string;
    password: string;
}

export const login = async(input: loginInput) =>  {
    try{
    const {username, password} = input;

    const user = await prisma.admin.findUnique({
        where: {username: username}
    })
    if(!user){
        throw new Error("Invalid username or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error("Invalid username or password");
    }
    const accessToken = jwt.sign(
        {username: user.username},
        process.env.JWT_SECRET as string,
        {expiresIn: "15m"}
    )
    const refreshToken = jwt.sign(
        {username: user.username},
        process.env.REFRESH_TOKEN as string,
        {expiresIn: "7d"}
    )

    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7);

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            adminId: user.id,
            expiresAt: refreshExpiry
        }
    });

    return {
        accessToken,
        refreshToken,
        user: {
            username: user.username,
        }
    }
}catch(error: unknown){
    if(error instanceof Error){
        throw new Error(error.message);
    } else {
        throw new Error("An unexpected error occurred");
    }
}
}

export const refreshToken = async (refreshToken: string) => {
    try{
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN as string
        ) as {username: string};
        const storedToken = await prisma.refreshToken.findUnique({
            where: {token: refreshToken}
        });
        if(!storedToken){
            throw new Error("Invalid refresh token");
        }
        if(storedToken.expiresAt < new Date()){
            await prisma.refreshToken.delete({
                where: {token: refreshToken}
            });
            throw new Error("Refresh token expired");
        }
        await prisma.refreshToken.delete({
            where: {id: storedToken.id}
        });
        const newAccessToken = jwt.sign(
            {username: decoded.username},
            process.env.JWT_SECRET as string,
            {expiresIn: "15m"}
        )
        const newRefreshToken = jwt.sign(
            {username: decoded.username},
            process.env.REFRESH_TOKEN as string,
            {expiresIn: "7d"}
        )
        const newExpiry = new Date();
        newExpiry.setDate(newExpiry.getDate() + 7);

        await prisma.refreshToken.create({
            data: {
                token: newRefreshToken, 
                adminId: storedToken.adminId,
                expiresAt: newExpiry
            }
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    }catch(error: unknown){
        throw error instanceof Error ? new Error(error.message) : new Error("An unexpected error occurred");
    }
}

export const logOut = async (refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new Error("Refresh token required");
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN as string
    );

    const deleted = await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });

    if (deleted.count === 0) {
      throw new Error("Invalid refresh token");
    }

    return { message: "Logged out successfully" };

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid or expired refresh token");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};