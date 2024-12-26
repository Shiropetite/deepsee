import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { User } from '../models/user-model';

export interface AuthToken extends JwtPayload {
    email: string;
    id: number;
}

export const generateToken = ({ user }: { user: User }): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Missing SECRET_KEY in environment variables');
    }
    return jwt.sign({ email: user.email, id: user.__id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = ({ token }: { token: string }): AuthToken | null => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Missing SECRET_KEY in environment variables');
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET) as AuthToken;
    } catch {
        return null;
    }
};

export const hashPassword = async ({ password }: { password: string }): Promise<string> => {
    return await argon2.hash(password);
};

export const verifyPassword = async ({ userPassword, password }: {
    password: string,
    userPassword: string,
}): Promise<boolean> => {
    return await argon2.verify(userPassword, password);
};
