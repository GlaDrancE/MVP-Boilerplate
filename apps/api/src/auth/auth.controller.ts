import { Request, Response } from "express";
import { authSchema } from "@repo/schema";
import AuthService from "./auth.service.js";
import { generateAccessToken, verifyRefreshToken } from "@repo/auth";

const authService = new AuthService();
export default class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const data = authSchema.signupSchema.safeParse(req.body);

            if (!data.success) {
                return res.status(400).json({
                    message: "Invalid data",
                    errors: data.error.flatten().fieldErrors,
                })
            }
            const { accessToken, refreshToken } = await authService.signup(data.data);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/"
            })
            return res.status(200).json({
                message: "User created successfully",
                data: { accessToken },
            })

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error,
            })
        }
    }
    async signin(req: Request, res: Response) {
        try {
            const data = authSchema.signinSchema.safeParse(req.body);

            if (!data.success) {
                return res.status(400).json({
                    message: "Invalid data",
                    errors: data.error.flatten().fieldErrors,
                })
            }
            const { accessToken, refreshToken } = await authService.signin(data.data);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === "production",
                path: "/"
            })
            return res.status(200).json({
                message: "User signed in successfully",
                data: { accessToken },
            })

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error,
            })
        }
    }
    async signout(req: Request, res: Response) {
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "none",
                maxAge: 0,
                secure: process.env.NODE_ENV === "production",
                path: "/"
            })
            return res.status(200).json({
                message: "User signed out successfully",
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error,
            })
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken();
            if (!refreshToken) {
                return res.status(401).json({
                    message: "Unauthorized",
                })
            }
            const decode = verifyRefreshToken(refreshToken);
            if (!decode) {
                return res.status(401).json({
                    message: "Unauthorized",
                })
            }
            const accessToken = generateAccessToken({ id: decode.id as string })
            return res.status(200).json({
                messsage: "Token refreshed successfully",
                data: {
                    token: accessToken
                }
            })

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error,
            })
        }
    }
}