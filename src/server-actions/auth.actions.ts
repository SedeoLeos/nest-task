'use server'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from "next/headers";
async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
}
const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');


export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !verifyPassword(password, user.password)) {
        return { error: 'Invalid email or password' }
    }

    const token = await new SignJWT({ id: user.id, email: user.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2h')
        .sign(secret);
    const cookieStore = await cookies();
    cookieStore.set('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true, secure: true, sameSite: 'strict' });
    return { token, user };
}


export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return { payload };
    } catch {

        return { error: 'error' }
    }
}
