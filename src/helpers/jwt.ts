import jwt from "jsonwebtoken";

type Role = "USER" | "ADMIN";

export function generateToken(payload: {
    username: string,
    userId: string,
    role: Role
}): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });

    return token;
}


export function decodeToken(token: string | undefined): {
    username: string,
    userId: string,
    role: Role
} | null {
    if (!token) return null;
    const payload = jwt.decode(token) as {
        username: string,
        userId: string,
        role: Role
    };
    if (!payload) return null;
    return payload;
}
