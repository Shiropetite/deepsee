import { Request, Response } from 'express';

import { fetchUserByEmail, fetchUserById, saveUser } from '../../repositories/user/user-repository';
import { generateToken, hashPassword, verifyPassword } from '../../utils/auth-util';

import { SignInBody, SignUpBody } from './auth-types';

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as SignInBody;

    const user = await fetchUserByEmail({ email });
    if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const isPasswordValid = await verifyPassword({
        password,
        userPassword: user.password,
    });

    if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const token = generateToken({ user });

    res.json({ token, user });
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as SignUpBody;

    const userAlreadyExists = await fetchUserByEmail({ email: body.email });
    if (userAlreadyExists) {
        res.status(409).json({ error: 'User already exists' });
        return;
    }

    body.password = await hashPassword({ password: body.password });
    body.type = 'talent';

    const savedUser = await saveUser({ user: body });
    if (!savedUser) {
        res.status(500).json({ error: 'Failed to save user' });
        return;
    }

    const token = generateToken({ user: savedUser });

    res.json({ token, user: savedUser });
};

export const identifyUser = async (req: Request, res: Response): Promise<void> => {
    const token = req.user;
    if (!(token)) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const user = await fetchUserById({ id: token.id });
    if (!(user)) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    res.status(200).json({ user });
};
