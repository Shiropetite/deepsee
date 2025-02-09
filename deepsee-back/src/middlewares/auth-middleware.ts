import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../utils/auth-util';

/**
 * Identifie un utilisateur avec son token et refuse la connexion si celui-ci n'est pas valide
 * @param req - Requête
 * @param res - Réponse
 * @param next - Fonction suivante
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const authToken = verifyToken({ token });

        if (authToken) {
            req.user = authToken;
            return next();
        }
    }

    res.status(401).json({ message: 'Unauthorized' });
};

/**
 * Identifie un utilisateur avec son token s'il existe
 * @param req - Requête
 * @param res - Réponse
 * @param next - Fonction suivante
 */
export const identify = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const authToken = verifyToken({ token });

        if (authToken) {
            req.user = authToken;
            return next();
        }
    }

    next();
};
