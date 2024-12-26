import { JwtPayload } from 'jsonwebtoken';

export interface AuthToken extends JwtPayload {
    email: string;
    id: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthToken;
        }
    }
}
