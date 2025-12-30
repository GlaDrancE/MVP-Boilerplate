import jwt from "jsonwebtoken"
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not set")
}
export const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

export const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { id: string }
}