import { authSchema } from "@repo/schema";
import prisma from "@repo/db"
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from "@repo/auth";
export default class AuthService {
    async signup(data: authSchema.SignupSchema) {
        const password = await hashPassword(data.password);
        const user = await prisma.user.create({
            data: { ...data, password }
        })
        if (!user) {
            throw new Error("Failed to create user")
        }
        const accessToken = generateAccessToken({ id: user.id })
        const refreshToken = generateRefreshToken({ id: user.id })
        return { accessToken, refreshToken }
    }
    async signin(data: authSchema.SigninSchema) {
        const user = await prisma.user.findUnique({ where: { email: data.email } })
        if (!user) {
            throw new Error("User not found")
        }
        const isPasswordValid = await comparePassword(data.password, user.password)
        if (!isPasswordValid) {
            throw new Error("Invalid password")
        }
        const accessToken = generateAccessToken({ id: user.id })
        const refreshToken = generateRefreshToken({ id: user.id })
        return { accessToken, refreshToken }
    }
}